import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { Fade as Hamburger } from "hamburger-react";
import Icon from "../components/Icon";

import {
  Drawer,
  DrawerOverlay,
  DrawerBody,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

const NavMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toggleDrawer = () => {
    onOpen();
  };

  return (
    <div className="relative">
      <Hamburger color="#000" rounded size={30} toggle={toggleDrawer} />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton
            left="36px"
            size="lg"
            _focus={{ border: "none" }}
          />
          <DrawerBody className="bg-green-50">
            <div className="flex flex-col text-base font-bold gap-y-3 px-2 mt-32">
              <Link href="/about">
                <div className="hover:text-primary hover:translate-x-3  text-2xl cursor-pointer transition-all">
                  About
                </div>
              </Link>

              <Link href="/team">
                <div className="hover:text-primary hover:translate-x-3  text-2xl cursor-pointer transition-all">
                  Team
                </div>
              </Link>

              <Link href="/contact">
                <div className="hover:text-primary hover:translate-x-3  text-2xl cursor-pointer transition-all">
                  Contact
                </div>
              </Link>
              <br />
              <h3 className="font-medium">Follow Us:</h3>
              <div className="flex py-1 space-x-4">
                <Icon url="http://instagram.com/vlanduk">
                  <FaInstagram size={18} />
                </Icon>
                <Icon url="https://www.facebook.com/V-Land-UK-100137252369546">
                  <FaFacebookF size={18} />
                </Icon>
                <Icon url="https://twitter.com/vlandukmag">
                  <FaTwitter size={18} />
                </Icon>
                <Icon url="https://www.linkedin.com/company/v-land-uk">
                  <FaLinkedinIn size={18} />
                </Icon>
              </div>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default NavMenu;
