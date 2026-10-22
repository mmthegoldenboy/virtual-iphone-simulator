import { imagePaths } from "./image-paths";

export const appArtwork = { ...imagePaths, chatBackground: "", notesBackground: "" };
export const apps = [
  { id: "messages", name: "Messages", icon: "messages", image: imagePaths.messages, badge: "99+" },
  { id: "mail", name: "Mail", icon: "mail", image: imagePaths.mail, badge: "" },
  { id: "tinder", name: "Tinder", icon: "tinder", image: "", badge: "99+" },
  { id: "phone", name: "Phone", icon: "phone", image: imagePaths.phone, badge: "" },
  { id: "notes", name: "Notes", icon: "notes", image: imagePaths.notes, badge: "" },
  { id: "photos", name: "Photos", icon: "photos", image: imagePaths.photos, badge: "" },
];
