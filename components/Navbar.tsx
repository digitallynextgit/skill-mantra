"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { NAV_LINKS, Coursesdata } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdClose } from "react-icons/md";
import PopupForm from "./PopupForm";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter(); // Router instance
  const pathname = usePathname(); // Current pathname

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };

  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]); // Close on pathname change

  const handleCourseClick = (slug: string) => {
    // Close the mobile menu and navigate to the course page
    setIsMobileMenuOpen(false);
    router.push(`/course/${slug}`);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 py-5">
        <div className="flexBetween max-container padding-container relative">
          <Link href="/">
            <Image
              src="/logo.webp"
              alt="logo"
              width={310}
              height={100}
              loading="lazy"
              className="lg:w-[15vw] 4xl:w-[50vw] w-[50vw]"
            />
          </Link>

          <div className="lg:flexCenter hidden gap-4">
            <ul className="hidden h-full gap-12 lg:flex mr-10">
              {NAV_LINKS.map((link) => (
                <li key={link.key} className="relative">
                  {link.key === "courses" ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="text-blue-90 2xl:text-lg  lg:text-base flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold">
                        {link.label}
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white">
                        <DropdownMenuSeparator />
                        {Coursesdata.map((course) => (
                          <DropdownMenuItem key={course.slug}>
                            <button
                              onClick={() => handleCourseClick(course.slug)}
                              className="text-black block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                              {course.title}
                            </button>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-blue-90 2xl:text-lg  lg:text-base flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold"
                      onClick={toggleMobileMenu} 
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <Button
              asChild
              variant="outline"
              className="border-2 border-blue-90 text-blue-90 text-lg"
            >
              <Link href="https://courses.skillmantra.in/login">Login</Link>
            </Button>

            <Button
              asChild
              className="border-2 border-[#FFC224] bg-[#FFC224] text-blue-90 text-lg"
            >
              <Link href="https://courses.skillmantra.in/register">Register</Link>
            </Button>
          </div>

          <div className="lg:hidden relative bg-white z-50">
            <Image
              src="/menu.svg"
              alt="menu"
              width={32}
              height={32}
              className="inline-block cursor-pointer"
              onClick={toggleMobileMenu}
            />
            {isMobileMenuOpen && (
              <div className="fixed top-[100px] left-0 right-0 bottom-0 bg-white p-4 flex flex-col items-center w-full h-[65vh] z-50">
                <button
                  className="absolute top-2 right-2 p-2"
                  onClick={toggleMobileMenu}
                  aria-label="Close menu"
                >
                  <MdClose size={24} />
                </button>
                <ul className="flex flex-col gap-4 w-full items-center">
                  {NAV_LINKS.map((link) => (
                    <li key={link.key} className="w-full">
                      {link.key === "courses" ? (
                        <DropdownMenu>
                          <DropdownMenuTrigger className="text-blue-90 text-xl flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold w-full text-center">
                            {link.label}
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-white">
                            <DropdownMenuSeparator />
                            {Coursesdata.map((course) => (
                              <DropdownMenuItem key={course.slug}>
                                <button
                                  onClick={() => handleCourseClick(course.slug)} 
                                  className="text-black block w-full text-left px-4 py-2 hover:bg-gray-100"
                                >
                                  {course.title}
                                </button>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-blue-90 text-xl flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold w-full text-center"
                          onClick={toggleMobileMenu} 
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                  <li>
                    <Button
                      asChild
                      variant="outline"
                      className="border-2 border-blue-90 text-blue-90 md:text-lg text-[7vw] md:w-full w-[35vw] h-[15vw] md:h-0 text-center"
                    >
                      <Link href="https://courses.skillmantra.in/login">Login</Link>
                    </Button>
                  </li>
                  <li>
                    <Button
                      asChild
                      className="border-2 border-[#FFC224] bg-[#FFC224] text-blue-90 md:text-lg text-[7vw] md:w-full w-[35vw] h-[15vw] md:h-0 text-center"
                    >
                      <Link href="https://courses.skillmantra.in/register">Register</Link>
                    </Button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Popup Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-20 ">
          <PopupForm />
        </div>
      )}
    </>
  );
};

export default Navbar;
