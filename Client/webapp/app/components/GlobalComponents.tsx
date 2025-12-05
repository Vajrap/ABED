"use client";

import React from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { MusicPlayer } from "@/components/MusicPlayer";

export default function GlobalComponents() {
  return (
    <>
      <LanguageSwitcher />
      <MusicPlayer />
    </>
  );
}

