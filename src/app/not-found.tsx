import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 | Page Not Found",
};

export default function Custom404() {
  return (
    <div className="min-h-screen flex">
      <main className="w-full flex flex-wrap justify-center self-center pb-60">
        <div className="text-center px-1 text-5xl w-full">
          404 -This page could not be found
        </div>
        <br />
        <Link href="/public" className="pt-11 w-full text-center">
          Return Home
        </Link>
      </main>
    </div>
  );
}
