import React from "react";

const Footer = () => {
  return (
    <footer className="border-t-2 border-gray-100">
      <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 py-6 text-center text-sm text-gray-500 sm:flex-row sm:text-left">
        <div>
          <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
        </div>
        <div>
          <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
