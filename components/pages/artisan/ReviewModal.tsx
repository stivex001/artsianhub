import React, { useState } from "react";
import { CustomButton } from "@/components/clickable/CustomButton";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  onClose: () => void;
};

export const ReviewModal = ({ onClose }: Props) => {
  const [name, setName] = useState("");
  const [testimonial, setTestimonial] = useState("");
  const [rating, setRating] = useState(0);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-[#D9D9D9] w-[350px] lg:w-[600px] p-8 rounded-lg relative shadow-lg"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 30, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()} // prevent close on modal click
        >
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 mb-4 rounded-md text-gray-700"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder="Testimonial..."
            className="w-full p-3 mb-4 h-28 rounded-md text-gray-700 resize-none"
            value={testimonial}
            onChange={(e) => setTestimonial(e.target.value)}
          />

          <div className="flex justify-between items-center">
            <h1 className="text-blue-800 font-semibold text-lg">Rate</h1>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 cursor-pointer ${
                    i <= rating ? "text-yellow-400" : "text-gray-400"
                  }`}
                  onClick={() => setRating(i)}
                  fill={i <= rating ? "currentColor" : "none"}
                />
              ))}
            </div>
            <CustomButton label="Submit" onClick={() => onClose()} />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
