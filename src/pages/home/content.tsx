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
            {/* Sidebar */}
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} user={user} users={users} />

            {/* Main Chat Section */}
            <div className={`flex-grow pt-[75px] h-full lg:ml-[25%] px-5 pb-2 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-cyan-100' : 'bg-white text-cyan-900'}`}>
                <div className="h-[90%] flex flex-col space-y-3">
                    {/* Message Display */}
                    <div className="flex flex-col space-y-2 overflow-y-auto h-full px-2">
                        {messages.length === 0 ? (
                            <div className="text-center text-cyan-800 mt-24 font-medium">
                                No messages yet, let's start a conversation!
                            </div>
                        ) : (
                            messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex items-start space-x-3 ${msg.user === user?.displayname ? 'justify-end' : 'justify-start'}`}
                                >
                                    {/* Tin nhắn người khác */}
                                    {msg.user !== user?.displayname && (
                                        <div className="flex items-start space-x-2">
                                            <div className="w-10 h-10 rounded-full border-2 border-cyan-300 dark:border-cyan-600">
                                                <img
                                                    src={Avata}
                                                    alt="Avata"
                                                    className="w-full h-full rounded-full object-cover"
                                                />
                                            </div>
                                            <div className="flex flex-col max-w-[70%]">
                                                <span className="text-cyan-800 dark:text-cyan-200 font-semibold">{msg.user}</span>
                                                <div className={`rounded-xl p-3 shadow-md font-medium mt-1 w-fit max-w-full
                                                    ${msg.file?.name.match(/\.(jpeg|jpg|png|gif)$/) ? '' : isDarkMode ? 'bg-gray-700 text-white' : 'bg-cyan-500 text-white'}`}>
                                                    {msg.file ? (
                                                        <div className="flex flex-col">
                                                            <p className="text-white dark:text-white">{msg.message}</p>
                                                            {msg.file.name.match(/\.(jpeg|jpg|png|gif)$/) ? (
                                                                <img
                                                                    src={msg.file.data}
                                                                    alt="Uploaded file"
                                                                    className="max-w-96 max-h-96 mt-2 rounded-lg object-cover cursor-pointer border border-gray-300 dark:border-gray-600"
                                                                    onClick={() => msg.file && setModalImage(msg.file.data)}
                                                                />
                                                            ) : (
                                                                <a href={msg.file.data} download={msg.file.name} className="underline text-white">
                                                                    {msg.file.name}
                                                                </a>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <p className="text-white dark:text-white">{msg.message}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Tin nhắn của mình */}
                                    {msg.user === user?.displayname && (
                                        <div className="flex mr-2 flex-col items-end max-w-[70%]">
                                            <div className={`rounded-xl p-3 shadow-md font-medium mt-1 w-fit max-w-full
                                                ${msg.file?.name.match(/\.(jpeg|jpg|png|gif)$/) ? '' : isDarkMode ? 'bg-cyan-600 text-white' : 'bg-cyan-500 text-white'}`}>
                                                {msg.file ? (
                                                    <div className="flex flex-col">
                                                        <p className="text-white dark:text-white">{msg.message}</p>
                                                        {msg.file.name.match(/\.(jpeg|jpg|png|gif)$/) ? (
                                                            <img
                                                                src={msg.file.data}
                                                                alt="Uploaded file"
                                                                className="max-w-96 max-h-96 mt-2 rounded-lg object-cover cursor-pointer border border-gray-300 dark:border-gray-600"
                                                                onClick={() => msg.file && setModalImage(msg.file.data)}
                                                            />
                                                        ) : (
                                                            <a href={msg.file.data} download={msg.file.name} className="underline text-white">
                                                                {msg.file.name}
                                                            </a>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <p className="text-white dark:text-white">{msg.message}</p>
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
                            <div className="absolute bottom-16 right-12 shadow-lg rounded-lg">
                                <EmojiPicker onEmojiClick={handleEmojiClick} />
                            </div>
                        )}
                    </div>
                </div>

                {/* Preview image section */}
                <div className="relative w-full">
                    {previewImage && (
                        <div className="absolute bottom-4 left-0 w-24 h-24 bg-gray-200 dark:bg-gray-700 border rounded-lg flex">
                            <img
                                src={previewImage}
                                alt="preview"
                                className="w-full h-full object-cover rounded-lg"
                            />
                            <button
                                className="absolute top-1 right-1 text-red-500 bg-white dark:bg-gray-900 rounded-full text-sm"
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

                {/* Input và nút gửi */}
                <div className={`flex items-center bottom-5 rounded-xl px-2 py-1 border shadow-md transition-colors duration-300
                    ${isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-cyan-300'}`}>
                    <input
                        ref={inputRef}
                        className={`flex-grow bg-transparent outline-none px-2 h-[40px]
                            ${isDarkMode ? 'text-cyan-100 placeholder:text-cyan-400' : 'text-cyan-800 placeholder:text-cyan-400'}`}
                        placeholder="Enter message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />

                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                        accept="image/*, application/pdf, .doc, .docx, .xls, .xlsx"
                    />

                    <button className={`px-2 transition-colors duration-200
                        ${isDarkMode ? 'text-cyan-300 hover:text-cyan-200' : 'text-cyan-500 hover:text-cyan-600'}`} onClick={() => fileInputRef.current?.click()}
                    >
                        <FaIcons.FaPaperclip />
                    </button>

                    <button className={`px-2 transition-colors duration-200
                        ${isDarkMode ? 'text-cyan-300 hover:text-cyan-200' : 'text-cyan-500 hover:text-cyan-600'}`} onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    >
                        <FaIcons.FaHeart />
                    </button>
                    <button className={`px-2 transition-colors duration-200
                        ${isDarkMode ? 'text-cyan-300 hover:text-cyan-200' : 'text-cyan-500 hover:text-cyan-600'}`} onClick={sendMessage}
                    >
                        <FaIcons.FaPaperPlane />
                    </button>
                </div>
            </div>

        </>
    ) : null;
}

export default Content;