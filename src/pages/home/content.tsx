import * as FaIcons from 'react-icons/fa';
import { useState, useEffect, useRef } from "react";
import { socketService } from "../../config/socket";
import { getUserInfo } from "../../services/serviceUser";
import { User } from "../../type/userType";
import EmojiPicker from "emoji-picker-react";
import { useTheme } from "../../config/theme";
import Sidebar from "../../components/layout/sidebar";
import Avata from "../../assets/avata.jpg";

function Content() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<{ user: string; message: string; file?: { name: string; data: string; }; }[]>([]);
    const [users, setUsers] = useState<{ id: string; username: string }[]>([]);
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
    const { isDarkMode } = useTheme();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const messageEndRef = useRef<HTMLDivElement | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null); // Ảnh xem trước khi upload
    const [modalImage, setModalImage] = useState<string | null>(null); // Ảnh mở trong overlay

    useEffect(() => {
        socketService.connect();
        const socket = socketService.getSocket();
        if (!socket) return;

        socket.on('updateUsers', (data: { id: string; username: string }[]) => {
            setUsers(data);
        });

        socket.on('receiveMessage', (data: { user: string; message: string; file?: { name: string; data: string } }) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        const accessToken = sessionStorage.getItem('accessToken');
        if (accessToken) {
            getUserInfo(accessToken)
                .then((data) => {
                    if (data) {
                        setUser(data);
                        socket.emit('userConnected', { id: socket.id, username: data.displayname });
                    } else {
                        setError('Không tìm thấy người dùng hoặc không có quyền truy cập');
                    }
                })
                .catch((err) => {
                    setError('Lỗi khi lấy dữ liệu người dùng');
                    console.error(err);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setError('Không tìm thấy mã token truy cập');
            setLoading(false);
        }

        return () => {
            socket.emit('userDisconnected', { id: socket.id });
            socketService.disconnect();
        };
    }, []);

    // Tự động cuộn xuống cuối khi có tin nhắn mới
    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const sendMessage = () => {
        if (!socketService || (!message.trim() && !selectedFile)) return;

        if (selectedFile) {
            const reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onload = () => {
                socketService.emit('sendMessage', {
                    user: user?.displayname || 'Anonymous',
                    message,
                    file: { name: selectedFile.name, data: reader.result }
                });
                setSelectedFile(null);
                setPreviewImage(null);
                setMessage('');
            };
        } else {
            socketService.emit('sendMessage', { user: user?.displayname || 'Anonymous', message });
            setMessage('');
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setPreviewImage(reader.result as string); // Chỉ ảnh xem trước, không ảnh hưởng overlay
            };
        }
    };

    const handleEmojiClick = (emojiObject: any) => {
        setMessage((prev) => prev + emojiObject.emoji);
        setShowEmojiPicker(false);

        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return user ? (
        <>
            {/* Phần nội dung trái */}
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} user={user} users={users} />

            {/* phần nội dung chính (chat section) */}
            <div className={`flex-grow pt-[75px] h-full lg:ml-[25%] pl-5 pr-5 pb-5 ${isDarkMode ? "bg-gray-600" : "bg-white"}`}>

                <div className="h-[90%] flex flex-col justify-start space-y-3">
                    {/* Display messages */}
                    <div className="flex flex-col space-y-2 overflow-y-auto h-[100%]">
                        {messages.length === 0 ? (
                            <div className={`text-center ${isDarkMode ? "text-gray-800" : "text-cyan-800"} mt-24`}>
                                No messages yet, let's start chatting
                            </div>
                        ) : (
                            messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex items-start space-x-3 ${msg.user === user?.displayname ? 'justify-end' : 'justify-start'}`}
                                >
                                    {/* Nếu là tin nhắn của người khác */}
                                    {msg.user !== user?.displayname && (
                                        <div className="flex items-start space-x-2">
                                            {/* Avatar */}
                                            <div className="w-10 h-10 rounded-full border-2 border-gray-300 flex-shrink-0">
                                                <img
                                                    src={Avata}
                                                    alt="Avata"
                                                    className="w-full h-full rounded-full object-cover"
                                                />
                                            </div>

                                            {/* Phần tên và nội dung tin nhắn */}
                                            <div className="flex flex-col max-w-[70%]">
                                                {/* Tên người dùng */}
                                                <span className={`${isDarkMode ? "text-white" : "text-cyan-800"} font-semibold`}>{msg.user}</span>

                                                <div
                                                    className={`rounded-lg p-2 font-medium text-white mt-1 w-fit max-w-full 
                                                    ${msg.file?.name.match(/\.(jpeg|jpg|png|gif)$/) ? "" : isDarkMode ? "bg-gray-800" : "bg-blue-500"}`}
                                                >
                                                    {msg.file ? (
                                                        <div className="flex flex-col">
                                                            <p>{msg.message}</p>
                                                            {msg.file.name.match(/\.(jpeg|jpg|png|gif)$/) ? (
                                                                <img
                                                                    src={msg.file.data}
                                                                    alt="Uploaded file"
                                                                    className="max-w-96 max-h-96 mt-2 rounded-lg object-cover cursor-pointer border border-gray-300"
                                                                    onClick={() => msg.file && setModalImage(msg.file.data)}
                                                                />
                                                            ) : (
                                                                <a href={msg.file.data} download={msg.file.name} className="underline">
                                                                    {msg.file.name}
                                                                </a>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <p>{msg.message}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Nếu là tin nhắn của chính mình */}
                                    {msg.user === user?.displayname && (
                                        <div className="flex mr-2 flex-col items-end max-w-[70%]">
                                            {/* Nội dung tin nhắn */}
                                            <div
                                                className={`rounded-lg p-2 font-medium text-white mt-1 w-fit max-w-full 
                                                    ${msg.file?.name.match(/\.(jpeg|jpg|png|gif)$/) ? "" : isDarkMode ? "bg-gray-800" : "bg-blue-500"}`}
                                            >
                                                {msg.file ? (
                                                    <div className="flex flex-col">
                                                        <p>{msg.message}</p>
                                                        {msg.file.name.match(/\.(jpeg|jpg|png|gif)$/) ? (
                                                            <img
                                                                src={msg.file.data}
                                                                alt="Uploaded file"
                                                                className="max-w-96 max-h-96 mt-2 rounded-lg object-cover cursor-pointer border border-gray-300"
                                                                onClick={() => msg.file && setModalImage(msg.file.data)}
                                                            />
                                                        ) : (
                                                            <a href={msg.file.data} download={msg.file.name} className="underline">
                                                                {msg.file.name}
                                                            </a>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <p>{msg.message}</p>
                                                )}
                                            </div>

                                        </div>
                                    )}
                                </div>
                            ))
                        )}

                        {/* Modal hiển thị ảnh lớn */}
                        {modalImage && (
                            <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
                                onClick={() => setModalImage(null)}>
                                <img src={modalImage} alt="Large Preview" className="max-w-[80%] max-h-[80%] rounded-lg" />
                            </div>
                        )}


                        <div ref={messageEndRef}></div>

                        {showEmojiPicker && (
                            <div className="absolute bottom-16 right-12 bg-white shadow-lg rounded-lg p-4">
                                <EmojiPicker onEmojiClick={handleEmojiClick} />
                            </div>
                        )}
                    </div>
                </div>

                {/* Vùng chứa ảnh xem trước */}
                <div className="relative w-full">
                    {previewImage && (
                        <div className="absolute bottom-4 left-0 w-24 h-24 bg-gray-200 border rounded-lg flex">
                            <img
                                src={previewImage}
                                alt="preview"
                                className="w-full h-full object-cover rounded-lg"
                            />
                            <button
                                className="absolute top-1 right-1 text-red-500 bg-white rounded-full flex items-center justify-center text-sm"
                                onClick={() => {
                                    setPreviewImage(null);
                                    setSelectedFile(null);
                                }}
                            >
                                <FaIcons.FaTimesCircle />
                            </button>
                        </div>
                    )}
                </div>

                {/* Message input and send button */}
                <div className="flex items-center space-x-3 mt-5">
                    <input
                        ref={inputRef}
                        className={`flex-grow rounded-lg h-[35px] pl-3 pr-3 bg-gray-300 outline-none ${isDarkMode ? "text-gray-600" : "text-cyan-800"}`}
                        placeholder="Enter messenger"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />

                    {/* Input file ẩn */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                        accept="image/*, application/pdf, .doc, .docx, .xls, .xlsx"
                    />

                    {/* Button Paperclip */}
                    <button
                        className={`${isDarkMode ? "bg-gray-700" : "bg-blue-500"} text-white rounded-full p-2 hover:scale-105`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <FaIcons.FaPaperclip />
                    </button>
                    <button
                        className={`${isDarkMode ? "bg-gray-700" : "bg-blue-500"} text-white rounded-full p-2 hover:scale-105`}
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    >
                        <FaIcons.FaHeart />
                    </button>
                    <button
                        className={`${isDarkMode ? "bg-gray-700" : "bg-blue-500"} text-white rounded-full p-2 hover:scale-105`}
                        onClick={sendMessage}
                    >
                        <FaIcons.FaPaperPlane />
                    </button>
                </div>
            </div>
        </>
    ) : null;
}

export default Content;