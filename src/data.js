import { IoGameController, IoMusicalNote, IoCamera } from "react-icons/io5";
import { FaPaintBrush, FaFilm } from "react-icons/fa";
import { GiDramaMasks } from "react-icons/gi";
import { MdEmojiNature } from "react-icons/md";

export const categories = [
  { id: 1, name: "PhotoG", iconSrc: <IoCamera fontSize={30} /> },
  { id: 2, name: "FAC", iconSrc: <FaPaintBrush fontSize={30} /> },
  { id: 3, name: "E-Sports", iconSrc: <IoGameController fontSize={30} /> },
  { id: 4, name: "Cine", iconSrc: <FaFilm fontSize={30} /> },
  { id: 5, name: "Mascerades", iconSrc: <GiDramaMasks fontSize={30} /> },
  { id: 6, name: "IMC Music", iconSrc: <IoMusicalNote fontSize={30} /> },
  { id: 7, name: "Outreach", iconSrc: <MdEmojiNature fontSize={30} /> },
];
