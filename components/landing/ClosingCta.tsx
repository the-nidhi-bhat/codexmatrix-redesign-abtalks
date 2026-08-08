"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function ClosingCta() {
  return (
    <section className="px-5 pb-16 pt-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-3xl border border-border-subtle bg-elevated p-6 text-center relative overflow-hidden"
      >
        <div className="flex justify-center mb-4">
          <Image src="/logo.png" alt="" width={44} height={44} className="rounded-xl opacity-90" />
        </div>
        <h3 className="font-display text-2xl tracking-wide">
          DAY 1 STARTS <span className="marker-underline text-primary">TONIGHT.</span>
        </h3>
        <p className="text-text-secondary text-[13px] mt-2 max-w-xs mx-auto">
          Sixty days from now you&apos;ll have sixty commits and sixty posts recruiters can actually see.
        </p>
        <Link href="/dashboard">
          <motion.span
            whileTap={{ scale: 0.96 }}
            className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white text-sm font-semibold"
          >
            Start the challenge <ArrowRight size={15} />
          </motion.span>
        </Link>
      </motion.div>
    </section>
  );
}
