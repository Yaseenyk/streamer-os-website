'use client';

import { motion, type Variants } from 'framer-motion';
import ContactForm from '@/components/ContactForm';

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function ContactPage() {
  return (
    <motion.main
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-xl px-6 py-24 sm:py-32"
    >
      <motion.section variants={item} className="text-center">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Secure Channel.
        </h1>
        <p className="mt-4 text-slate-400">
          Have a question about the Supporter Edition, or want to report a bug?
          Drop us a line.
        </p>
      </motion.section>

      <motion.div
        variants={item}
        className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl sm:p-8"
      >
        <ContactForm />
      </motion.div>
    </motion.main>
  );
}
