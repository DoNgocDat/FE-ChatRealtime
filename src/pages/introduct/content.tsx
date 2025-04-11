import { motion } from "framer-motion";
import Img1 from "../../assets/img-1.png";
import Img2 from "../../assets/img-2.png";
import Footer from "../../components/layout/footer";
import Rating from "./rating"

function Content() {
    return (
        <div className="h-screen flex">

            <div className="flex flex-col">
                <div className="mt-20 mb-20 mx-4 sm:mx-10 lg:mx-32 space-y-16">

                    {/* Tiêu đề */}
                    <motion.div
                        className="flex justify-center items-center text-center"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-cyan-800 font-medium text-xl sm:text-2xl">
                            Smart Chat - A place to connect people and share everything
                            <span className="inline-block animate-waving origin-hand"> 👋🏻 </span>
                        </span>
                    </motion.div>

                    {/* Video giới thiệu */}
                    <motion.div
                        className="w-full max-w-3xl mx-auto px-4"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="relative w-full pb-[56.25%]">
                            <iframe
                                className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg"
                                src="https://www.youtube.com/embed/NSnkb1IAjbE?autoplay=1&mute=1&loop=1&playlist=NSnkb1IAjbE"
                                title="Welcome to Vietnam"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </motion.div>

                    {/* Tính năng chính */}
                    <motion.div
                        className="flex flex-col sm:flex-row items-center space-y-5 sm:space-y-0 sm:space-x-10"
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.img
                            src={Img1}
                            className="w-full sm:w-[40%] rounded-lg"
                            initial={{ opacity: 0, x: -100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        />
                        <motion.span
                            className="text-cyan-800 text-base sm:text-lg text-center sm:text-left"
                            initial={{ opacity: 0, x: 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            Main features of the application:
                            Create and join group chat rooms easily.
                            Share photos, videos and documents.
                            Express emotions through unique emojis and stickers.
                        </motion.span>
                    </motion.div>

                    {/* Tích hợp đa nền tảng */}
                    <motion.div
                        className="flex flex-col-reverse sm:flex-row items-center space-y-5 sm:space-y-0 sm:space-x-10"
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.span
                            className="text-cyan-800 text-base sm:text-lg text-center sm:text-left"
                            initial={{ opacity: 0, x: -100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            Cross-platform integration:
                            Make sure users know they can access Smart Chat from a variety of devices such as computers and mobile phones.
                        </motion.span>
                        <motion.img
                            src={Img2}
                            className="w-full sm:w-[40%] rounded-lg"
                            initial={{ opacity: 0, x: 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        />
                    </motion.div>
                </div>

                {/* rating */}
                <Rating />

                {/* Footer */}
                <Footer />
            </div>
        </div>
    );
}

export default Content;
