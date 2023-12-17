import tw from 'twin.macro';

export const buttonStyle = [tw`flex gap-4 justify-between items-center text-left`, tw`rounded-sm`];

export const contentStyle = [
  tw`bg-gray-200 bg-opacity-10 backdrop-blur-2xl`,
  tw`rounded-md border-2 border-gray-200 border-opacity-10`,
  tw`flex flex-col`,
  tw`text-sm text-gray-200 text-opacity-75 text-left`,
];

export const separatorStyle = [tw`h-[1px] mx-0.5`, tw`bg-gray-200 bg-opacity-20 backdrop-blur`];
