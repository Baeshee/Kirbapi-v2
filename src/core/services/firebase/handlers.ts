import { ref, getStorage, getDownloadURL } from "firebase/storage";
import { doc, getDocs, setDoc, collection } from "firebase/firestore";
import { db, app } from ".";

import { data } from "../data";

export const getData = async () => {
  const data: Record<string, string>[] = [];
  const querySnapshot = await getDocs(collection(db, "kirbapi_abilities"));

  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });

  return data;
};

// export const getImageUrls = async () => {
//   const storage = getStorage(app);

//   data.forEach(async (item) => {
//     const imageRef = await ref(
//       storage,
//       `gs://personal-dev-projects.appspot.com/kirbapi_images/${item.image}`
//     );

//     const logoRef = await ref(
//       storage,
//       `gs://personal-dev-projects.appspot.com/kirbapi_logos/${item.logo}`
//     );

//     const imageUrl = await getDownloadURL(imageRef).then((url) => {
//       return url;
//     });

//     const logoUrl = await getDownloadURL(logoRef)
//       .then((url) => {
//         return url;
//       })
//       .catch((error) => {
//         return "";
//       });

//     await setDoc(doc(db, "kirbapi_abilities", item.name), {
//       name: item.name,
//       logo: logoUrl,
//       image: imageUrl,
//       first_game: item.first_game,
//       f_year: item.f_year,
//       last_game: item.last_game,
//       l_year: item.l_year,
//       appearances: item.appearances,
//       primary: item.primary,
//       description: item.description,
//       type: item.type,
//       kirby_appearance: item.kirby_appearance,
//       extra_power: item.extra_power,
//     });
//   });
// };

// export const getImageUrls = async () => {
//   const storage = getStorage(app);

//   data.forEach(async (item) => {
//     const imageRef = await ref(
//       storage,
//       `gs://personal-dev-projects.appspot.com/kirbapi_game_logos/${item.image}`
//     );

//     const imageUrl = await getDownloadURL(imageRef).then((url) => {
//       return url;
//     });

//     await setDoc(doc(db, "kirbapi_games", item.name), {
//       name: item.name,
//       image: imageUrl,
//     });
//   });

//   console.log("Added images to database");
// };
