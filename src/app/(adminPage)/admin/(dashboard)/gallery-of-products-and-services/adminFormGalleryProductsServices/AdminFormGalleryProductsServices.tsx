// 'use client';

// import { ProductType } from 'types/dataTypeForFirebase';
// import styles from './AdminFormGalleryProductsServices.module.scss';
// import { useEffect, useReducer, useState } from 'react';
// import {
//   initStateGalleryProductsServicesFile,
//   initStateProducts,
//   reducerGalleryProductsServicesFile,
//   reducerProducts,
// } from 'helpers/reducer';
// import {
//   ActionsGalleryProductsServicesFile,
//   ActionsProducts,
// } from 'types/reducerTypes';
// import { uploadImageToStorage } from '@/firebase/uploadAndDeleteImage';
// import Image from 'next/image';
// import poster from '../../../../../../../public/posters/poster-not-found.jpg';
// import { useUploadImageFileWithName } from 'hooks/useUploadImageFile';
// import { getImageURL } from 'helpers/functions';
// import { submitProductCard } from 'app/api/actionCard/action';
// import { GalleryProductsServicesFileType } from 'types/otherType';

// interface IProps {
//   data: ProductType;
// }

// const AdminFormGalleryProductsServices = ({ data }: IProps) => {
//   const [state, dispatch] = useReducer(reducerProducts, initStateProducts);
//   const [stateFiles, dispatchFile] = useReducer(
//     reducerGalleryProductsServicesFile,
//     initStateGalleryProductsServicesFile
//   );
//   // const [files, setFiles] = useState<FileList | null>();
//   // console.log('state', state);
//   console.log('stateFile', stateFiles);

//   const { blobImageURL, imageName, handleSelectFileWithName } =
//     useUploadImageFileWithName();

//   useEffect(() => {
//     dispatch({ type: imageName, payload: blobImageURL } as ActionsProducts);
//   }, [blobImageURL, imageName]);

//   const {
//     nameUK,
//     nameEN,
//     backgroundImageDesktop,
//     backgroundImageTablet,
//     backgroundImageMobile,
//     imageURL1,
//     imageURL2,
//     imageURL3,
//     imageURL4,
//     imageURL5,
//     imageURL6,
//   } = state;

//   // const handleChangePreview = async ({
//   //   target: { name, files },
//   // }: React.ChangeEvent<HTMLInputElement>) => {
//   //   if (files !== null) {
//   //     const imageURL = await uploadImageToStorage('home', name, files[0]);
//   //     dispatch({ type: name, payload: imageURL } as ActionsProducts);
//   //   }
//   // };

//   const handleFile = (type: string, payload: FileList | null) => {
//     dispatchFile({ type, payload } as ActionsGalleryProductsServicesFile);
//   };

//   useEffect(() => {
//     // console.log('useEffect-products', product);
//     if (data) {
//       const keys = Object.keys(data);
//       keys.forEach(key => {
//         dispatch({
//           type: key,
//           payload: data[key as keyof typeof data],
//         } as ActionsProducts);
//       });
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const getObjectWithImageURL = async (
//     filesObject: GalleryProductsServicesFileType
//   ) => {
//     Object.keys(filesObject).forEach(key => {
//       if (filesObject[key as keyof typeof filesObject] === null) {
//         delete filesObject[key as keyof typeof filesObject];
//       }
//     });
//     const keys = Object.keys(filesObject);

//     return await Promise.all(
//       keys.map(async key => {
//         const files = filesObject[key as keyof typeof filesObject];
//         if (files) {
//           const imageURL = await getImageURL({
//             data,
//             files,
//             imageName: key,
//             nameEN,
//             nameCollection: 'products',
//           });
//           if (imageURL) {
//             return { [key]: imageURL };
//           }
//         }
//       })
//     );
//   };

//   const getNewData = (
//     imagesURL: (
//       | {
//           [x: string]: string;
//         }
//       | undefined
//     )[],
//     data: ProductType
//   ) => {
//     imagesURL.forEach(imageURL => {
//       if (imageURL !== undefined) {
//         const keys = Object.keys(imageURL);

//         data[keys[0]] = imageURL[keys[0]];
//       }
//     });
//     console.log('function', data);
//     return data;
//   };

//   const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
//     evt.preventDefault();
//     // setIsLoading(true);

//     const data: ProductType = state;
//     // console.log('data', data);
//     const imagesURL = await getObjectWithImageURL(stateFiles);

//     console.log('URL', imagesURL);
//     const newData = getNewData(imagesURL, data);

//     console.log('newData', newData);

//     await submitProductCard(newData);

//     // setIsLoading(false);
//   };

//   return (
//     <li>
//       <form autoComplete="off" onSubmit={handleSubmit}>
//         <h3 className={styles.title}>{nameUK}</h3>
//         <label className={styles.label}>
//           Зображення 1
//           <input
//             className={styles.inputImage}
//             type="file"
//             name="imageURL1"
//             accept=".jpg, .jpeg, .png"
//             onChange={({ target: { files, name } }) => {
//               handleSelectFileWithName(files, name);
//               handleFile(name, files);
//             }}
//           />
//           <div className={styles.wrapperImage}>
//             <Image
//               src={imageURL1 ? imageURL1 : poster}
//               alt="The photo of ptoduct"
//               priority
//               className={styles.image}
//               fill
//               sizes="400px"
//             />
//           </div>
//         </label>

//         <label className={styles.label}>
//           Зображення 2
//           <input
//             className={styles.inputImage}
//             type="file"
//             name="imageURL2"
//             accept=".jpg, .jpeg, .png"
//             onChange={({ target: { files, name } }) => {
//               handleSelectFileWithName(files, name);
//               handleFile(name, files);
//             }}
//           />
//           <div className={styles.wrapperImage}>
//             <Image
//               src={imageURL2 ? imageURL2 : poster}
//               alt="The photo of ptoduct"
//               priority
//               className={styles.image}
//               fill
//               sizes="400px"
//             />
//           </div>
//         </label>
//         <label className={styles.label}>
//           Зображення 3
//           <input
//             className={styles.inputImage}
//             type="file"
//             name="imageURL3"
//             accept=".jpg, .jpeg, .png"
//             onChange={({ target: { files, name } }) => {
//               handleSelectFileWithName(files, name);
//               handleFile(name, files);
//             }}
//           />
//           <div className={styles.wrapperImage}>
//             <Image
//               src={imageURL3 ? imageURL3 : poster}
//               alt="The photo of ptoduct"
//               priority
//               className={styles.image}
//               fill
//               sizes="400px"
//             />
//           </div>
//         </label>
//         <label className={styles.label}>
//           Зображення 4
//           <input
//             className={styles.inputImage}
//             type="file"
//             name="imageURL4"
//             accept=".jpg, .jpeg, .png"
//             onChange={({ target: { files, name } }) => {
//               handleSelectFileWithName(files, name);
//               handleFile(name, files);
//             }}
//           />
//           <div className={styles.wrapperImage}>
//             <Image
//               src={imageURL4 ? imageURL4 : poster}
//               alt="The photo of ptoduct"
//               priority
//               className={styles.image}
//               fill
//               sizes="400px"
//             />
//           </div>
//         </label>
//         <label className={styles.label}>
//           Зображення 5
//           <input
//             className={styles.inputImage}
//             type="file"
//             name="imageURL5"
//             accept=".jpg, .jpeg, .png"
//             onChange={({ target: { files, name } }) => {
//               handleSelectFileWithName(files, name);
//               handleFile(name, files);
//             }}
//           />
//           <div className={styles.wrapperImage}>
//             <Image
//               src={imageURL5 ? imageURL5 : poster}
//               alt="The photo of ptoduct"
//               priority
//               className={styles.image}
//               fill
//               sizes="400px"
//             />
//           </div>
//         </label>
//         <label className={styles.label}>
//           Зображення 6
//           <input
//             className={styles.inputImage}
//             type="file"
//             name="imageURL6"
//             accept=".jpg, .jpeg, .png"
//             onChange={({ target: { files, name } }) => {
//               handleSelectFileWithName(files, name);
//               handleFile(name, files);
//             }}
//           />
//           <div className={styles.wrapperImage}>
//             <Image
//               src={imageURL6 ? imageURL6 : poster}
//               alt="The photo of ptoduct"
//               priority
//               className={styles.image}
//               fill
//               sizes="400px"
//             />
//           </div>
//         </label>
//         <label className={styles.label}>
//           Фонове зображення для комп&apos;ютерів
//           <input
//             className={styles.inputImage}
//             type="file"
//             name="backgroundImageDesktop"
//             accept=".jpg, .jpeg, .png"
//             onChange={({ target: { files, name } }) => {
//               handleSelectFileWithName(files, name);
//               handleFile(name, files);
//             }}
//           />
//           <div
//             className={
//               backgroundImageDesktop
//                 ? styles.wrapperImageDesktopBefore
//                 : styles.wrapperImageDesktop
//             }
//           >
//             <Image
//               src={backgroundImageDesktop ? backgroundImageDesktop : poster}
//               fill
//               sizes="850px"
//               alt="The background photo"
//               priority
//               className={styles.image}
//             />
//           </div>
//         </label>

//         <label className={styles.label}>
//           Фонове зображення для планшетів
//           <input
//             className={styles.inputImage}
//             type="file"
//             name="backgroundImageTablet"
//             accept=".jpg, .jpeg, .png"
//             onChange={({ target: { files, name } }) => {
//               handleSelectFileWithName(files, name);
//               handleFile(name, files);
//             }}
//           />
//           <div
//             className={
//               backgroundImageTablet
//                 ? styles.wrapperImageTabletBefore
//                 : styles.wrapperImageTablet
//             }
//           >
//             <Image
//               src={backgroundImageTablet ? backgroundImageTablet : poster}
//               fill
//               sizes="600px"
//               alt="The background photo"
//               priority
//               className={styles.image}
//             />
//           </div>
//         </label>
//         <label className={styles.label}>
//           Фонове зображення для мобільних телефонів
//           <input
//             className={styles.inputImage}
//             type="file"
//             name="backgroundImageMobile"
//             accept=".jpg, .jpeg, .png"
//             onChange={({ target: { files, name } }) => {
//               handleSelectFileWithName(files, name);
//               handleFile(name, files);
//             }}
//           />
//           <div
//             className={
//               backgroundImageMobile
//                 ? styles.wrapperImageMobileBefore
//                 : styles.wrapperImageMobile
//             }
//           >
//             <Image
//               src={backgroundImageMobile ? backgroundImageMobile : poster}
//               fill
//               sizes="200px"
//               alt="Alliance Group"
//               className={styles.image}
//               priority
//             />
//           </div>
//         </label>
//         <div className={styles.wrapperBtn}>
//           <button
//             className={styles.button}
//             type="submit"
//             // disabled={isLoading ? true : false}
//           >
//             Додати
//             {/* {isLoading ? 'Завантажується' : btnName} */}
//           </button>
//         </div>
//       </form>
//     </li>
//   );
// };
// export default AdminFormGalleryProductsServices;
