import React, { Fragment } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "./motionVariants";

interface CodeProfileCardProps {
  name: string;
  role: string;
  location: string;
  experience: string;
  companies: string[];
  stack: string[];
  focus: string;
}

const CodeArray: React.FC<{ items: string[] }> = ({ items }) => (
  <>
    <span className="text-gray-400">[</span>
    {items.map((item, i) => (
      <Fragment key={item}>
        <span className="text-orange-300">"{item}"</span>
        {i < items.length - 1 && <span className="text-gray-400">, </span>}
      </Fragment>
    ))}
    <span className="text-gray-400">],</span>
  </>
);

const CodeProfileCard: React.FC<CodeProfileCardProps> = ({
  name,
  role,
  location,
  experience,
  companies,
  stack,
  focus,
}) => {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-3xl bg-[#0a0a0f] shadow-2xl ring-1 ring-white/10">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-5 py-4">
        <span className="h-3 w-3 rounded-full bg-red-500/70" />
        <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
        <span className="h-3 w-3 rounded-full bg-green-500/70" />
        <span className="ml-3 font-mono text-xs text-gray-500">about.ts</span>
      </div>

      <motion.pre
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="flex-1 whitespace-pre-wrap break-words p-6 font-mono text-[13px] leading-relaxed md:text-sm"
      >
        <motion.div variants={fadeInUp}>
          <span className="text-purple-400">const</span>{" "}
          <span className="text-sky-300">developer</span>{" "}
          <span className="text-gray-400">= {"{"}</span>
        </motion.div>
        <motion.div variants={fadeInUp} className="pl-4">
          <span className="text-sky-300">name</span>
          <span className="text-gray-400">: </span>
          <span className="text-orange-300">"{name}"</span>
          <span className="text-gray-400">,</span>
        </motion.div>
        <motion.div variants={fadeInUp} className="pl-4">
          <span className="text-sky-300">role</span>
          <span className="text-gray-400">: </span>
          <span className="text-orange-300">"{role}"</span>
          <span className="text-gray-400">,</span>
        </motion.div>
        <motion.div variants={fadeInUp} className="pl-4">
          <span className="text-sky-300">location</span>
          <span className="text-gray-400">: </span>
          <span className="text-orange-300">"{location}"</span>
          <span className="text-gray-400">,</span>
        </motion.div>
        <motion.div variants={fadeInUp} className="pl-4">
          <span className="text-sky-300">experience</span>
          <span className="text-gray-400">: </span>
          <span className="text-orange-300">"{experience}"</span>
          <span className="text-gray-400">,</span>
        </motion.div>
        <motion.div variants={fadeInUp} className="pl-4">
          <span className="text-sky-300">companies</span>
          <span className="text-gray-400">: </span>
          <CodeArray items={companies} />
        </motion.div>
        <motion.div variants={fadeInUp} className="pl-4">
          <span className="text-sky-300">stack</span>
          <span className="text-gray-400">: </span>
          <CodeArray items={stack} />
        </motion.div>
        <motion.div variants={fadeInUp} className="pl-4">
          <span className="text-sky-300">focus</span>
          <span className="text-gray-400">: </span>
          <span className="text-orange-300">"{focus}"</span>
        </motion.div>
        <motion.div variants={fadeInUp}>
          <span className="text-gray-400">{"}"}</span>
          <span className="text-gray-400">;</span>
          <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-blue-400 align-middle" />
        </motion.div>
      </motion.pre>
    </div>
  );
};

export default CodeProfileCard;
