import React from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "./motionVariants";

interface SkillBarSkill {
  name: string;
  level: number;
  icon: React.ReactNode;
}

interface SkillCategory {
  name: string;
  skillNames: string[];
}

interface SkillBarsProps {
  skills: SkillBarSkill[];
  categories: SkillCategory[];
}

const SkillBars: React.FC<SkillBarsProps> = ({ skills, categories }) => {
  const skillByName = new Map(skills.map((s) => [s.name, s]));

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="grid gap-6 md:grid-cols-2"
    >
      {categories.map((cat) => (
        <motion.div
          key={cat.name}
          variants={fadeInUp}
          className="glass-dark rounded-2xl p-6 md:p-8"
        >
          <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-blue-400">
            {cat.name}
          </h3>
          <div className="space-y-5">
            {cat.skillNames.map((name) => {
              const skill = skillByName.get(name);
              if (!skill) return null;
              return (
                <div key={name}>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="flex-shrink-0">
                        {React.cloneElement(skill.icon as React.ReactElement, {
                          size: 18,
                        })}
                      </span>
                      <span className="truncate text-sm font-medium text-white">
                        {name}
                      </span>
                    </div>
                    <span className="flex-shrink-0 text-xs font-semibold text-gray-400">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-white/10">
                    <motion.div
                      className="h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                      initial={{ width: "0%" }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SkillBars;
