"use client";

import ContactForm from "@/components/ContactForm"
import Image from "next/image";
import { motion } from "framer-motion";


const LoginPage = () => (
    <div className="flex min-h-screen justify-center items-center  bg-gradient-to-r from-blue-900 via-blue-500 to-blue-400">
        <div className="relative flex justify-center items-center w-full md:w-1/2">
            <div className="hidden md:block z-30">
              <motion.div
                className="absolute top-48 -left-[12vw] rotate-45 "
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                <div className="  flex items-center justify-center">
                  <Image src="/x.webp" alt="tri" width={100} height={100} />
                </div>
              </motion.div>
              <motion.div
                className="absolute top-72 -left-[22vw] rotate-45 "
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                <div className="w-16 h-16  flex items-center justify-center">
                  <Image src="/plus.webp" alt="tri" width={100} height={100} />
                </div>
              </motion.div>
              <motion.div
                className="absolute top-0 -left-[22vw] rotate-45 "
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                <div className="w-12 h-12  flex items-center justify-center">
                  <Image src="/tri.webp" alt="tri" width={100} height={100} />
                </div>
              </motion.div>
              <motion.div
                className="absolute top-0 -right-[22vw] rotate-45"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, delay: 1 }}
              >
                <div className="w-12 h-12  flex items-center justify-center">
                <Image src="/triangle.webp" alt="tri" width={100} height={100} />
                </div>
              </motion.div>
              <motion.div
                className="absolute bottom-0 -right-[22vw] rotate-45"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                <div className="w-12 h-12  flex items-center justify-center">
                <Image src="/square.webp" alt="tri" width={100} height={100} />
                </div>
              </motion.div>
              <motion.div
                className="absolute bottom-20 -right-[12vw] rotate-45"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 3, delay: 1 }}
              >
                <div className="w-12 h-12  flex items-center justify-center">
                <Image src="/circle1.webp" alt="tri" width={100} height={100} />
                </div>
              </motion.div>
            </div>
        
            <ContactForm />
        
        </div>
    </div>
)
export default LoginPage;
