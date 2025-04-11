import { Separator } from "@/components/ui/separator";
import { GithubIcon, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import AboutModal from "./aboutmodal";
import FeaturesModal from "./featuresmodal";
import PrivacyModal from "./privacymodal";

const footerLinks = [
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Features",
    href: "/features",
  },
  {
    title: "Privacy",
    href: "/privacy",
  },
];

const Footer = () => {
  return (
    <div className="flex flex-col">
      <div />
      <footer>
        <div className="max-w-screen-xl mx-auto">
          <div className="py-12 flex flex-col justify-start items-center">
            {/* Logo */}
            <img
              src="/home/graduation-hat.png"
              alt="CC Logo"
              className="h-8 w-auto"
            />

            <ul className="mt-6 flex items-center gap-4 flex-wrap">
              <li>
                <AboutModal /> {/* Modal for About */}
              </li>
              <li>
                <FeaturesModal /> {/* Modal for Features */}
              </li>
              <li>
                <PrivacyModal /> {/* Modal for Privacy */}
              </li>
              {footerLinks
                .filter(
                  (link) =>
                    !["About", "Features", "Privacy"].includes(link.title)
                )
                .map(({ title, href }) => (
                  <li key={title}>
                    <Link
                      href={href}
                      className="text-muted-foreground hover:text-foreground font-medium"
                    >
                      {title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <Separator />
          <div className="py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
            {/* Copyright */}
            <span className="text-muted-foreground">
              &copy; {new Date().getFullYear()}{" "}
              <Link href="/" target="_blank">
                CampusCart
              </Link>
              . All rights reserved.
            </span>

            <div className="flex items-center gap-5 text-muted-foreground">
              <Link
                href="https://www.linkedin.com/in/alex-e-taylor/"
                target="_blank"
                className="transform hover:scale-110 hover:text-foreground transition-all duration-200"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="mailto:alexetaylor7@gmail.com"
                className="transform hover:scale-110 hover:text-foreground transition-all duration-200"
              >
                <Mail className="h-5 w-5" />
              </Link>
              <Link
                href="https://github.com/AlexETay7"
                target="_blank"
                className="transform hover:scale-110 hover:text-foreground transition-all duration-200"
              >
                <GithubIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
