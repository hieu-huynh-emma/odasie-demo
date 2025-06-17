// 'use client';

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';

// function TourFilters() {
//   const options = [];
//   const name = 'countries.slug';
//   const placeholder = 'Destination';
//   const currentValue = 'all';
//   const handleValueChange = (selectedOption: string) => {
//     // const newUrl = updateQueryParams(name, selectedOption);
//     // router.push(newUrl);
//   };

//   return (
//     <div className="flex flex-col gap-[35px] rounded-lg bg-gray-100 px-9 py-[14px] lg:flex-row lg:items-center">
//       {/* TODO: translation */}
//       <h4 className="typo-base-semibold uppercase text-gray-900">Filter</h4>
//       <ul className="flex flex-wrap gap-6">
//         <li>
//           <Select
//             name={name}
//             onValueChange={handleValueChange}
//             value={currentValue}>
//             <SelectTrigger className="min-w-[200px] max-w-[265px] bg-white">
//               <SelectValue placeholder={placeholder} />
//             </SelectTrigger>
//             <SelectContent>
//               {/* <SelectItem key={PLACEHOLDER_VALUE} value={PLACEHOLDER_VALUE}>
//                 {placeholder}
//               </SelectItem> */}
//               {options.map(option => (
//                 <SelectItem key={option.value} value={option.value}>
//                   {option.label}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </li>
//         <li>
//           <Select
//             name={name}
//             onValueChange={handleValueChange}
//             value={currentValue}>
//             <SelectTrigger className="min-w-[200px] max-w-[265px] bg-white">
//               <SelectValue placeholder={placeholder} />
//             </SelectTrigger>
//             <SelectContent>
//               {/* <SelectItem key={PLACEHOLDER_VALUE} value={PLACEHOLDER_VALUE}>
//                 {placeholder}
//               </SelectItem> */}
//               {options.map(option => (
//                 <SelectItem key={option.value} value={option.value}>
//                   {option.label}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </li>
//         <li>
//           <Select
//             name={name}
//             onValueChange={handleValueChange}
//             value={currentValue}>
//             <SelectTrigger className="min-w-[200px] max-w-[265px] bg-white">
//               <SelectValue placeholder={placeholder} />
//             </SelectTrigger>
//             <SelectContent>
//               {/* <SelectItem key={PLACEHOLDER_VALUE} value={PLACEHOLDER_VALUE}>
//                 {placeholder}
//               </SelectItem> */}
//               {options.map(option => (
//                 <SelectItem key={option.value} value={option.value}>
//                   {option.label}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </li>
//       </ul>
//     </div>
//   );
// }

// export default TourFilters;
