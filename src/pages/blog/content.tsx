import { motion } from "framer-motion";
import Img1 from "../../assets/avata-1.jpg";
import Img2 from "../../assets/img-1.png";
import Footer from "../../components/layout/footer";

function BlogPage() {
    return (
        <div className="h-screen flex flex-col">

            {/* Phần Tiêu Đề */}
            <div className="mt-20 mb-20 mx-4 sm:mx-10 lg:mx-32 space-y-16">
                <motion.div
                    className="flex justify-center items-center text-center"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-cyan-800 font-medium text-xl sm:text-2xl">
                        Wellcom to My Blog
                        <span className="inline-block animate-waving origin-hand"> 👋🏻 </span>
                    </span>
                </motion.div>

                {/* Giới thiệu bản thân */}
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
                        I am **Do Ngoc Dat**, a frontend developer with expertise in **React.js**,
                        **JavaScript**, and modern web technologies.
                        My focus is on creating seamless user experiences,
                        building responsive and high-performance applications.
                        I enjoy solving complex problems and constantly improving
                        my skills to stay up-to-date with the latest web development trends.
                    </motion.span>
                </motion.div>

                {/* Kinh nghiệm & Kỹ năng */}
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
                        I am a skilled frontend developer with expertise in modern web technologies.
                        My core skills include React.js, Next.js, and TypeScript, allowing me to build
                        high-performance and scalable applications. For styling, I utilize TailwindCSS
                        and SCSS to create visually appealing and responsive user interfaces.
                        I have experience working with REST APIs and GraphQL for seamless data communication.
                        Additionally, I manage application state efficiently using Redux, Zustand,
                        and React Query, ensuring smooth and optimized performance.
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
            <Footer />
        </div>
    );
}

export default BlogPage;
