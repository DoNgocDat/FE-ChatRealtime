import { FaStar } from "react-icons/fa";
import Img1 from "../../assets/img-1.png";
import { motion } from "framer-motion";
import { useState } from "react";
import ReviewForm from "./reviewForm";

type Rating = {
    username: string;
    rating: number;
    description: string;
    imageUrl?: string;
};

const ratingMessages: { [key: number]: string } = {
    1: "Very dissatisfied",
    2: "Dissatisfied",
    3: "Neutral",
    4: "Satisfied",
    5: "Very satisfied",
};

const dataRatings: Rating[] = [
    {
        username: "Nguyễn Văn A",
        rating: 5,
        description: "Sản phẩm rất tốt, đóng gói cẩn thận. Giao hàng nhanh.",
        imageUrl: Img1,
    },
    {
        username: "Trần Thị B",
        rating: 4,
        description: "Hài lòng với sản phẩm, chất lượng đúng như mô tả.",
    },
    {
        username: "Lê Văn C",
        rating: 2,
        description: "Sản phẩm giao chậm, chưa đúng size mong muốn.",
        imageUrl: Img1,
    },
    {
        username: "Phạm Thị D",
        rating: 3,
        description: "Bình thường, không có gì nổi bật.",
    },
    {
        username: "Đỗ Văn A",
        rating: 5,
        description: "Sản phẩm rất tốt, đóng gói cẩn thận. Giao hàng nhanh.",
        imageUrl: Img1,
    },
];

// Calculate average rating
const averageRating =
    dataRatings.reduce((sum, r) => sum + r.rating, 0) / dataRatings.length;

// Thêm ở đầu file
const getStarDistribution = (ratings: Rating[]) => {
    const total = ratings.length;
    const distribution = [0, 0, 0, 0, 0];

    ratings.forEach(({ rating }) => {
        distribution[rating - 1] += 1;
    });

    return distribution.map((count) => ({
        count,
        percent: total > 0 ? Math.round((count / total) * 100) : 0,
    }));
};

const starDistribution = getStarDistribution(dataRatings);

const Rating = () => {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="px-4 sm:px-10 lg:px-32 py-16">
            {showForm && <ReviewForm onClose={() => setShowForm(false)} />}

            {/* Header */}
            <motion.div
                className="flex flex-col sm:flex-row justify-between items-center mb-10"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <div className="text-center sm:text-left">
                    <p className="text-2xl font-bold text-cyan-800">
                        {averageRating.toFixed(1)}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                        ({dataRatings.length} reviews)
                    </p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowForm(true)}
                    className="mt-4 sm:mt-0 bg-cyan-800 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition"
                >
                    Submit your review
                </motion.button>
            </motion.div>

            {/* Star Distribution */}
            <div className="mb-10 space-y-2">
                {starDistribution
                    .map((item, index) => ({
                        star: 5 - index,
                        ...starDistribution[4 - index],
                    }))
                    .map(({ star, count, percent }) => (
                        <div key={star} className="flex items-center gap-4">
                            <div className="w-16 flex items-center gap-1 text-sm text-gray-600">
                                <span>{star}</span>
                                <FaStar className="text-yellow-400" />
                            </div>
                            <div className="flex-1 bg-gray-200 h-3 rounded-full overflow-hidden">
                                <div
                                    className="bg-yellow-400 h-full"
                                    style={{ width: `${percent}%` }}
                                ></div>
                            </div>
                            <span className="text-sm text-gray-500 w-10 text-right">{percent}%</span>
                        </div>
                    ))}
            </div>

            {/* Ratings */}
            <div className="flex flex-col gap-6">
                {dataRatings.map((item, idx) => (
                    <motion.div
                        key={idx}
                        className="bg-white shadow rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-cyan-800">{item.username}</h3>
                            <div className="flex gap-1 mt-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <FaStar
                                        key={i}
                                        size={18}
                                        className={`${i < item.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                            }`}
                                    />
                                ))}
                            </div>
                            <p className="text-sm italic text-gray-500 mt-1">
                                {ratingMessages[item.rating]}
                            </p>
                            <p className="mt-2 text-gray-700">{item.description}</p>
                        </div>
                        {item.imageUrl && (
                            <img
                                src={item.imageUrl}
                                alt="Review image"
                                className="w-full sm:w-32 h-auto rounded-xl border object-cover"
                            />
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Rating;