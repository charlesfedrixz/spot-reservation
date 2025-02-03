import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-footer text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold"> search my play</h3>
            <p className="text-sm text-gray-400">
              Find your perfect football turf spot
            </p>
          </div>
          <div className="flex space-x-6 text-lio">
            <a href="#" className="hover:text-[#1877F2] transition-colors">
              <Facebook />
            </a>
            <a href="#" className="hover:text-[#1DA1F2] transition-colors">
              <Twitter />
            </a>
            <a href="#" className="hover:text-[#E4405F] transition-colors">
              <Instagram />
            </a>
          </div>
        </div>
        <div className="mt-6 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} search my play. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
