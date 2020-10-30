import React from "react";

type PageHeaderProps = {
  title: string;
};

export default function PageHeader({ title }: PageHeaderProps) {
  return (
    <div className="md:flex md:items-center md:justify-between border-b border-gray-200 mb-5">
      <div className="flex-1 min-w-0 pb-5">
        <h2 className="text-2xl font-bold leading-7 text-logoFont sm:text-3xl sm:leading-9 sm:truncate">
          {title}
        </h2>
      </div>
      <div className="mt-4 flex md:mt-0 md:ml-4"></div>
    </div>
  );
}
