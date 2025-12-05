import { useState, useEffect } from "react";
import type {
  L10NType,
  LocalizedText,
  GetLocalizedText,
} from "@/types/localization";
import type { Language } from "@/types/localization";

// Re-export Language type for components
export type { Language };

// Localization data for ABED webapp
export const L10N: L10NType = {
  loginPage: {
    title: {
      en: "Arcane Beam Electric Dream",
      th: "Arcane Beam Electric Dream",
    },
    usernameLabel: {
      en: "Username",
      th: "ชื่อผู้ใช้",
    },
    passwordLabel: {
      en: "Password",
      th: "รหัสผ่าน",
    },
    loginButton: {
      en: "Login",
      th: "ลงชื่อเข้าใช้",
    },
    registerButton: {
      en: "Register",
      th: "สมัครสมาชิก",
    },
    loginError: {
      en: "Login failed. Please try again.",
      th: "เข้าสู่ระบบล้มเหลว โปรดลองอีกครั้ง",
    },
    invalidCredentials: {
      en: "Invalid username or password",
      th: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
    },
    userNotFound: {
      en: "User not found",
      th: "ไม่พบผู้ใช้",
    },
    networkError: {
      en: "Network error. Please check your connection.",
      th: "ข้อผิดพลาดเครือข่าย โปรดตรวจสอบการเชื่อมต่อ",
    },
    requiredField: {
      en: "This field is required",
      th: "กรุณากรอกข้อมูลในช่องนี้",
    },
    forgotPassword: {
      en: "Forgot password?",
      th: "ลืมรหัสผ่าน?",
    },
    newToRealm: {
      en: "New to the realm?",
      th: "ใหม่กับอาณาจักรนี้?",
    },
    createAccount: {
      en: "Create an account",
      th: "สร้างบัญชี",
    },
    forgotPasswordModal: {
      title: {
        en: "Reset Password",
        th: "รีเซ็ตรหัสผ่าน",
      },
      emailLabel: {
        en: "Email Address",
        th: "อีเมล",
      },
      submitButton: {
        en: "Send Reset Email",
        th: "ส่งอีเมลรีเซ็ต",
      },
      cancelButton: {
        en: "Cancel",
        th: "ยกเลิก",
      },
      successMessage: {
        en: "Password reset email sent!",
        th: "ส่งอีเมลรีเซ็ตรหัสผ่านแล้ว!",
      },
      errorMessage: {
        en: "Failed to send reset email. Please try again.",
        th: "ไม่สามารถส่งอีเมลรีเซ็ตได้ โปรดลองอีกครั้ง",
      },
    },
  },

  registerPage: {
    title: {
      en: "Create Your Account",
      th: "สร้างบัญชีของคุณ",
    },
    eulaTitle: {
      en: "End User License Agreement",
      th: "ข้อตกลงใบอนุญาตผู้ใช้งาน",
    },
    eulaContent: {
      en: `Welcome to ABED - A mystical realm where steam-powered arcane technology meets medieval adventure.

By creating an account and playing ABED, you agree to the following terms:

1. ACCEPTANCE OF TERMS
By accessing and using this game, you accept and agree to be bound by the terms and provision of this agreement.

2. GAME CONTENT AND CONDUCT
- You agree to use the game for lawful purposes only
- You will not engage in cheating, exploiting, or any form of disruptive behavior
- You understand this is a multiplayer experience and agree to respect other players
- Content created within the game remains property of the game developers

3. ACCOUNT RESPONSIBILITY
- You are responsible for maintaining the confidentiality of your account
- You agree to accept responsibility for all activities under your account
- You must provide accurate registration information
- One account per person is permitted

4. PRIVACY AND DATA
- We collect minimal data necessary for game functionality
- Your gameplay data helps us improve the experience
- We will never sell your personal information to third parties
- You can request account deletion at any time

5. INTELLECTUAL PROPERTY
- All game assets, code, and content are protected by copyright
- You may not reverse engineer or redistribute game content
- Screenshots and gameplay videos for personal use are permitted

6. SERVICE AVAILABILITY
- We strive for 99% uptime but cannot guarantee uninterrupted service
- We reserve the right to perform maintenance as needed
- Beta features may be unstable and subject to change

7. LIMITATION OF LIABILITY
- The game is provided "as is" without warranties
- We are not liable for data loss or gameplay interruption
- Virtual items have no real-world monetary value

8. MODIFICATIONS TO TERMS
- We reserve the right to modify these terms with notice
- Continued use constitutes acceptance of modified terms
- Material changes will be announced in-game

9. TERMINATION
- We may terminate accounts for violation of these terms
- You may delete your account at any time
- Upon termination, your right to use the service ceases

10. GOVERNING LAW
This agreement is governed by the laws of the jurisdiction where our servers are located.

By checking the agreement box below, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions.

Thank you for joining the ABED community. May your adventures be legendary!`,
      th: `ยินดีต้อนรับสู่ ABED - อาณาจักรลึกลับที่เทคโนโลยีลึกลับขับเคลื่อนด้วยไsteam พบกับการผจญภัยในยุคกลาง

การสร้างบัญชีและเล่น ABED หมายความว่าคุณยอมรับเงื่อนไขต่อไปนี้:

1. การยอมรับเงื่อนไข
การเข้าถึงและใช้เกมนี้ คุณยอมรับและตกลงที่จะผูกพันตามข้อตกลงนี้

2. เนื้อหาเกมและการปฏิบัติตัว
- คุณตกลงที่จะใช้เกมเพื่อวัตถุประสงค์ที่ถูกกฎหมายเท่านั้น
- คุณจะไม่มีส่วนร่วมในการโกง การหาช่องโหว่ หรือพฤติกรรมก่อกวนใดๆ
- คุณเข้าใจว่านี่เป็นประสบการณ์ผู้เล่นหลายคนและตกลงที่จะเคารพผู้เล่นอื่น
- เนื้อหาที่สร้างในเกมยังคงเป็นทรัพย์สินของผู้พัฒนาเกม

3. ความรับผิดชอบบัญชี
- คุณมีหน้าที่รักษาความลับของบัญชี
- คุณตกลงที่จะรับผิดชอบต่อกิจกรรมทั้งหมดภายใต้บัญชีของคุณ
- คุณต้องให้ข้อมูลการลงทะเบียนที่ถูกต้อง
- อนุญาตให้มีบัญชีหนึ่งบัญชีต่อคน

4. ความเป็นส่วนตัวและข้อมูล
- เราเก็บข้อมูลน้อยที่สุดที่จำเป็นสำหรับการทำงานของเกม
- ข้อมูลการเล่นของคุณช่วยให้เราปรับปรุงประสบการณ์
- เราจะไม่ขายข้อมูลส่วนบุคคลให้บุคคลที่สาม
- คุณสามารถขอลบบัญชีได้ตลอดเวลา

5. ทรัพย์สินทางปัญญา
- สินทรัพย์ของเกม โค้ด และเนื้อหาทั้งหมดได้รับการคุ้มครองด้วยลิขสิทธิ์
- คุณไม่สามารถวิศวกรรมย้อนกลับหรือแจกจ่ายเนื้อหาเกม
- สกรีนช็อตและวิดีโอเกมเพื่อใช้ส่วนตัวได้รับอนุญาต

6. ความพร้อมใช้งานของบริการ
- เรามุ่งมั่นที่จะให้บริการ 99% แต่ไม่สามารถรับประกันบริการต่อเนื่อง
- เราขอสงวนสิทธิ์ในการบำรุงรักษาตามที่จำเป็น
- คุณสมบัติเบต้าอาจไม่เสถียรและอาจมีการเปลี่ยนแปลง

7. ข้อจำกัดความรับผิด
- เกมมีให้ "ตามสภาพ" โดยไม่มีการรับประกัน
- เราไม่รับผิดชอบต่อการสูญเสียข้อมูลหรือการหยุดชะงักของเกม
- ไอเท็มเสมือนไม่มีมูลค่าเงินในโลกแห่งความจริง

8. การแก้ไขเงื่อนไข
- เราขอสงวนสิทธิ์ในการแก้ไขเงื่อนไขเหล่านี้โดยมีการแจ้งล่วงหน้า
- การใช้งานต่อไปถือเป็นการยอมรับเงื่อนไขที่แก้ไข
- การเปลี่ยนแปลงที่สำคัญจะมีการประกาศในเกม

9. การยกเลิก
- เราอาจยกเลิกบัญชีหากมีการละเมิดเงื่อนไขเหล่านี้
- คุณสามารถลบบัญชีของคุณได้ตลอดเวลา
- เมื่อยกเลิก สิทธิ์ในการใช้บริการจะสิ้นสุด

10. กฎหมายที่ใช้บังคับ
ข้อตกลงนี้อยู่ภายใต้กฎหมายของเขตอำนาจศาลที่เซิร์ฟเวอร์ของเราตั้งอยู่

การติ๊กช่องยอมรับด้านล่าง แสดงว่าคุณได้อ่าน เข้าใจ และตกลงที่จะผูกพันตามข้อตกลงเหล่านี้

ขอบคุณที่เข้าร่วมชุมชน ABED ขอให้การผจญภัยของคุณเป็นตำนาน!`,
    },
    agreeToEula: {
      en: "I have read and agree to the End User License Agreement",
      th: "ข้าพเจ้าได้อ่านและยอมรับข้อตกลงใบอนุญาตผู้ใช้งาน",
    },
    usernameLabel: {
      en: "Username",
      th: "ชื่อผู้ใช้",
    },
    passwordLabel: {
      en: "Password",
      th: "รหัสผ่าน",
    },
    confirmPasswordLabel: {
      en: "Confirm Password",
      th: "ยืนยันรหัสผ่าน",
    },
    emailLabel: {
      en: "Email",
      th: "อีเมล",
    },
    emailOptional: {
      en: "Email (Optional)",
      th: "อีเมล (ไม่บังคับ)",
    },
    registerButton: {
      en: "Create Account",
      th: "สร้างบัญชี",
    },
    backToLogin: {
      en: "Back to Login",
      th: "กลับไปหน้าเข้าสู่ระบบ",
    },

    // Validation messages
    requiredField: {
      en: "This field is required",
      th: "กรุณากรอกข้อมูลในช่องนี้",
    },
    passwordMismatch: {
      en: "Passwords do not match",
      th: "รหัสผ่านไม่ตรงกัน",
    },
    passwordRequirements: {
      en: "Password must be at least 8 characters with uppercase, lowercase, and numbers",
      th: "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร ประกอบด้วยตัวพิมพ์ใหญ่ ตัวพิมพ์เล็ก และตัวเลข",
    },
    usernameInvalid: {
      en: "Username must be 3-20 characters, letters and numbers only",
      th: "ชื่อผู้ใช้ต้องมี 3-20 ตัวอักษร เป็นตัวอักษรและตัวเลขเท่านั้น",
    },
    emailInvalid: {
      en: "Please enter a valid email address",
      th: "กรุณากรอกที่อยู่อีเมลให้ถูกต้อง",
    },
    eulaNotAccepted: {
      en: "You must agree to the terms and conditions",
      th: "คุณต้องยอมรับข้อตกลงและเงื่อนไข",
    },

    // Server responses
    registrationSuccess: {
      en: "Account created successfully! Please log in.",
      th: "สร้างบัญชีสำเร็จ! กรุณาเข้าสู่ระบบ",
    },
    registrationError: {
      en: "Registration failed. Please try again.",
      th: "การสมัครสมาชิกล้มเหลว โปรดลองอีกครั้ง",
    },
    usernameTaken: {
      en: "A user with this username already exists",
      th: "มีผู้ใช้ที่มีชื่อผู้ใช้นี้อยู่แล้ว",
    },
    characterIdTaken: {
      en: "This character name is already taken",
      th: "ชื่อตัวละครนี้ถูกใช้ไปแล้ว",
    },
    networkError: {
      en: "Network error. Please check your connection.",
      th: "ข้อผิดพลาดเครือข่าย โปรดตรวจสอบการเชื่อมต่อ",
    },
  },

  common: {
    loading: {
      en: "Loading...",
      th: "กำลังโหลด...",
    },
    error: {
      en: "Error",
      th: "ข้อผิดพลาด",
    },
    success: {
      en: "Success",
      th: "สำเร็จ",
    },
    cancel: {
      en: "Cancel",
      th: "ยกเลิก",
    },
    ok: {
      en: "OK",
      th: "ตกลง",
    },
    close: {
      en: "Close",
      th: "ปิด",
    },
    retry: {
      en: "Retry",
      th: "ลองใหม่",
    },
  },

  musicPlayer: {
    play: {
      en: "Play music",
      th: "เล่นเพลง",
    },
    pause: {
      en: "Pause music",
      th: "หยุดเพลง",
    },
    mute: {
      en: "Mute",
      th: "ปิดเสียง",
    },
    unmute: {
      en: "Unmute",
      th: "เปิดเสียง",
    },
    volumeControl: {
      en: "Volume control",
      th: "ควบคุมระดับเสียง",
    },
    expandPlayer: {
      en: "Expand player",
      th: "ขยายเครื่องเล่น",
    },
    collapsePlayer: {
      en: "Collapse player",
      th: "ย่อเครื่องเล่น",
    },
    togglePlaylist: {
      en: "Toggle playlist",
      th: "สลับรายการเพลง",
    },
    previousTrack: {
      en: "Previous track",
      th: "เพลงก่อนหน้า",
    },
    nextTrack: {
      en: "Next track",
      th: "เพลงถัดไป",
    },
    seekBack: {
      en: "Seek back 10s",
      th: "ย้อนกลับ 10 วินาที",
    },
    seekForward: {
      en: "Seek forward 10s",
      th: "ไปข้างหน้า 10 วินาที",
    },
    toggleShuffle: {
      en: "Toggle shuffle",
      th: "สลับการสลับเพลง",
    },
  },

  auth: {
    noToken: {
      en: "No session token provided",
      th: "ไม่มีโทเค็นเซสชัน",
    },
    invalidSession: {
      en: "Invalid or expired session",
      th: "เซสชันไม่ถูกต้องหรือหมดอายุ",
    },
    autoAuthFailed: {
      en: "Auto authentication failed",
      th: "การตรวจสอบอัตโนมัติล้มเหลว",
    },
    logoutFailed: {
      en: "Logout failed",
      th: "ออกจากระบบล้มเหลว",
    },
  },

  guest: {
    notImplemented: {
      en: "Guest login not implemented yet",
      th: "การเข้าสู่ระบบแบบแขกยังไม่พร้อมใช้งาน",
    },
  },

  characterCreation: {
    title: {
      en: "Create Character",
      th: "สร้างตัวละคร",
    },
    subtitle: {
      en: "Step into the realm of Arcane Beam Electric Dream",
      th: "ก้าวเข้าสู่ดินแดนแห่ง Arcane Beam Electric Dream",
    },
    characterStatus: {
      en: "Current Character Status",
      th: "สถานะตัวละครปัจจุบัน",
    },
    name: {
      en: "Character Name",
      th: "ชื่อตัวละคร",
    },
    namePlaceholder: {
      en: "Enter your character's name",
      th: "ใส่ชื่อตัวละครของคุณ",
    },
    gender: {
      en: "Gender",
      th: "เพศ",
    },
    male: {
      en: "Male",
      th: "ชาย",
    },
    female: {
      en: "Female", 
      th: "หญิง",
    },
    race: {
      en: "Race",
      th: "เผ่าพันธุ์",
    },
    class: {
      en: "Class",
      th: "อาชีพ",
    },
    background: {
      en: "Background",
      th: "ภูมิหลัง",
    },
    portrait: {
      en: "Portrait",
      th: "รูปภาพ",
    },
    backToTitle: {
      en: "Back to Title",
      th: "กลับไปหน้าแรก",
    },
    createCharacter: {
      en: "Create Character",
      th: "สร้างตัวละคร",
    },
    creating: {
      en: "Creating...",
      th: "กำลังสร้าง...",
    },
    notSet: {
      en: "Not set",
      th: "ยังไม่ได้ตั้งค่า",
    },
    // Name validation messages
    nameTooShort: {
      en: "Character names need to be at least 3 characters long",
      th: "ชื่อตัวละครต้องมีอย่างน้อย 3 ตัวอักษร",
    },
    nameTooLong: {
      en: "Name too long (max 20 characters)",
      th: "ชื่อยาวเกินไป (สูงสุด 20 ตัวอักษร)",
    },
    nameInvalidChars: {
      en: "Only English, Thai, and spaces allowed",
      th: "อนุญาตเฉพาะภาษาอังกฤษ ไทย และช่องว่าง",
    },
    nameRequired: {
      en: "Please enter a character name",
      th: "กรุณาใส่ชื่อตัวละคร",
    },
    nameMinLength: {
      en: "Character name must be at least 3 characters long",
      th: "ชื่อตัวละครต้องมีอย่างน้อย 3 ตัวอักษร",
    },
    nameMaxLength: {
      en: "Character name must be 20 characters or less",
      th: "ชื่อตัวละครต้องไม่เกิน 20 ตัวอักษร",
    },
    nameInvalidFormat: {
      en: "Character name can only contain English letters, Thai characters, and spaces",
      th: "ชื่อตัวละครสามารถมีได้เฉพาะตัวอักษรภาษาอังกฤษ ไทย และช่องว่าง",
    },
    nameTaken: {
      en: "Character name is already taken",
      th: "ชื่อตัวละครถูกใช้งานแล้ว",
    },
    creationFailed: {
      en: "Failed to create character. Please try again.",
      th: "สร้างตัวละครไม่สำเร็จ กรุณาลองใหม่",
    },
  },

  character: {
    invalidData: {
      en: "Invalid character creation data",
      th: "ข้อมูลการสร้างตัวละครไม่ถูกต้อง",
    },
    // Character stats labels
    attributes: {
      en: "Attributes",
      th: "คุณสมบัติ",
    },
    vitals: {
      en: "Vitals",
      th: "ค่าพลังชีวิต",
    },
    proficiencies: {
      en: "Proficiencies",
      th: "ความชำนาญ",
    },
    artisans: {
      en: "Artisan Skills",
      th: "ทักษะช่าง",
    },
    maxHP: {
      en: "Max HP",
      th: "พลังชีวิตสูงสุด",
    },
    maxSP: {
      en: "Max SP",
      th: "พลังกายสูงสุด",
    },
    maxMP: {
      en: "Max MP",
      th: "พลังเวทสูงสุด",
    },
    planarAptitude: {
      en: "Planar Aptitude",
      th: "ความสามารถเวทย์",
    },
    // Individual attribute names
    attributeNames: {
      charisma: {
        en: "Charisma",
        th: "เสน่ห์",
      },
      luck: {
        en: "Luck",
        th: "โชค",
      },
      intelligence: {
        en: "Intelligence",
        th: "สติปัญญา",
      },
      leadership: {
        en: "Leadership",
        th: "ภาวะผู้นำ",
      },
      vitality: {
        en: "Vitality",
        th: "พลังชีวิต",
      },
      willpower: {
        en: "Willpower",
        th: "จิตใจ",
      },
      planar: {
        en: "Planar",
        th: "เวทย์",
      },
      control: {
        en: "Control",
        th: "การควบคุม",
      },
      dexterity: {
        en: "Dexterity",
        th: "ความคล่องแคล่ว",
      },
      agility: {
        en: "Agility",
        th: "ความว่องไว",
      },
      strength: {
        en: "Strength",
        th: "ความแข็งแกร่ง",
      },
      endurance: {
        en: "Endurance",
        th: "ความอดทน",
      },
    },
    // Individual proficiency names
    proficiencyNames: {
      sword: {
        en: "Sword",
        th: "ดาบ",
      },
      shield: {
        en: "Shield",
        th: "โล่",
      },
      axe: {
        en: "Axe",
        th: "ขวาน",
      },
      mace: {
        en: "Mace",
        th: "กระบอง",
      },
      spear: {
        en: "Spear",
        th: "หอก",
      },
      bareHand: {
        en: "Bare Hand",
        th: "มือเปล่า",
      },
      dagger: {
        en: "Dagger",
        th: "มีดสั้น",
      },
      rapier: {
        en: "Rapier",
        th: "ดาบปลายแหลม",
      },
      greatSword: {
        en: "Great Sword",
        th: "ดาบใหญ่",
      },
      machete: {
        en: "Machete",
        th: "มีดพร้า",
      },
      blade: {
        en: "Blade",
        th: "ใบมีด",
      },
      scimitar: {
        en: "Scimitar",
        th: "ดาบโค้ง",
      },
      zanmadao: {
        en: "Zanmadao",
        th: "ซันมาดาโอ",
      },
      warAxe: {
        en: "War Axe",
        th: "ขวานสงคราม",
      },
      halberd: {
        en: "Halberd",
        th: "หอกยาว",
      },
      javelin: {
        en: "Javelin",
        th: "หอกขว้าง",
      },
      flail: {
        en: "Flail",
        th: "ลูกตุ้ม",
      },
      bow: {
        en: "Bow",
        th: "ธนู",
      },
      crossbow: {
        en: "Crossbow",
        th: "หน้าไม้",
      },
      throwingKnife: {
        en: "Throwing Knife",
        th: "มีดขว้าง",
      },
      staff: {
        en: "Staff",
        th: "ไม้เท้า",
      },
      wand: {
        en: "Wand",
        th: "ไม้กายสิทธิ์",
      },
      orb: {
        en: "Orb",
        th: "ลูกแก้ว",
      },
      tome: {
        en: "Tome",
        th: "หนังสือเวท",
      },
      warHammer: {
        en: "War Hammer",
        th: "ค้อนสงคราม",
      },
      gun: {
        en: "Gun",
        th: "ปืน",
      },
      magicWand: {
        en: "Magic Wand",
        th: "ไม้กายสิทธิ์",
      },
      relic: {
        en: "Relic",
        th: "วัตถุมงคล",
      },
    },
    // Individual artisan skill names
    artisanNames: {
      performance: {
        en: "Performance",
        th: "การแสดง",
      },
      jewelry: {
        en: "Jewelry",
        th: "เครื่องประดับ",
      },
      tailoring: {
        en: "Tailoring",
        th: "การตัดเย็บ",
      },
      blacksmithing: {
        en: "Blacksmithing",
        th: "การตีเหล็ก",
      },
      carpentry: {
        en: "Carpentry",
        th: "การช่างไม้",
      },
      cooking: {
        en: "Cooking",
        th: "การทำอาหาร",
      },
      alchemy: {
        en: "Alchemy",
        th: "การปรุงยา",
      },
      engineering: {
        en: "Engineering",
        th: "วิศวกรรม",
      },
      herbalism: {
        en: "Herbalism",
        th: "สมุนไพร",
      },
      leatherworking: {
        en: "Leatherworking",
        th: "การทำหนัง",
      },
      masonry: {
        en: "Masonry",
        th: "การก่ออิฐ",
      },
      mining: {
        en: "Mining",
        th: "การขุดแร่",
      },
      agriculture: {
        en: "Agriculture",
        th: "การเกษตร",
      },
      smithing: {
        en: "Smithing",
        th: "การตีเหล็ก",
      },
      woodCutting: {
        en: "Wood Cutting",
        th: "การตัดไม้",
      },
      foraging: {
        en: "Foraging",
        th: "การหาอาหาร",
      },
      weaving: {
        en: "Weaving",
        th: "การทอผ้า",
      },
      skinning: {
        en: "Skinning",
        th: "การถลกหนัง",
      },
      tanning: {
        en: "Tanning",
        th: "การฟอกหนัง",
      },
      enchanting: {
        en: "Enchanting",
        th: "การเสกมนตร์",
      },
      fishing: {
        en: "Fishing",
        th: "การตกปลา",
      },
      brewing: {
        en: "Brewing",
        th: "การต้มเบียร์",
      },
      tinkering: {
        en: "Tinkering",
        th: "การซ่อมแซม",
      },
      electrics: {
        en: "Electrics",
        th: "ไฟฟ้า",
      },
    },
    nameTaken: {
      en: "Character name is already taken",
      th: "ชื่อตัวละครถูกใช้งานแล้ว",
    },
    creationFailed: {
      en: "Character creation failed",
      th: "การสร้างตัวละครล้มเหลว",
    },
    listFailed: {
      en: "Failed to retrieve characters",
      th: "ไม่สามารถดึงข้อมูลตัวละครได้",
    },
    notFound: {
      en: "Character not found",
      th: "ไม่พบตัวละคร",
    },
    setActiveFailed: {
      en: "Failed to set active character",
      th: "ไม่สามารถตั้งค่าตัวละครที่ใช้งานได้",
    },
    invalidName: {
      en: "Invalid character name",
      th: "ชื่อตัวละครไม่ถูกต้อง",
    },
    nameAvailable: {
      en: "Character name is available",
      th: "ชื่อตัวละครพร้อมใช้งาน",
    },
    nameCheckFailed: {
      en: "Failed to check character name",
      th: "ไม่สามารถตรวจสอบชื่อตัวละครได้",
    },
    // Race names and descriptions
    races: {
      human: {
        name: { en: "Human", th: "มนุษย์" },
        description: { en: "Balanced and adaptable", th: "สมดุลและปรับตัวได้" },
      },
      elven: {
        name: { en: "Elven", th: "เอลฟ์" },
        description: { en: "Graceful and magical", th: "สง่างามและมีเวทมนตร์" },
      },
      orc: {
        name: { en: "Orc", th: "ออร์ค" },
        description: { en: "Strong and fierce", th: "แข็งแกร่งและดุร้าย" },
      },
      dwarf: {
        name: { en: "Dwarf", th: "คนแคระ" },
        description: { en: "Hardy and skilled", th: "แข็งแกร่งและชำนาญ" },
      },
      halfling: {
        name: { en: "Halfling", th: "ฮาล์ฟลิ่ง" },
        description: { en: "Lucky and nimble", th: "โชคดีและคล่องแคล่ว" },
      },
      vulpine: {
        name: { en: "Vulpine", th: "วุลพีน" },
        description: { en: "Intelligent and agile fox-like beings", th: "สิ่งมีชีวิตคล้ายหมาจิ้งจอกที่เฉลียวฉลาดและคล่องแคล่ว" },
      },
    },
    // Class names and descriptions
    classes: {
      cleric: {
        name: { en: "Cleric", th: "นักบวช" },
        description: { en: "A divine spellcaster with healing abilities", th: "ผู้ใช้เวทมนตร์ศักดิ์สิทธิ์ที่มีความสามารถในการรักษา" },
      },
      seer: {
        name: { en: "Seer", th: "ผู้ทำนาย" },
        description: { en: "A mystical seer with planar vision", th: "ผู้ทำนายที่มีพลังเวทย์และมุมมองแห่งมิติ" },
      },
      mage: {
        name: { en: "Mage", th: "นักเวทย์" },
        description: { en: "A powerful spellcaster with arcane knowledge", th: "ผู้ใช้เวทมนตร์ผู้ทรงพลังที่มีความรู้ด้านเวทมนตร์" },
      },
      mystic: {
        name: { en: "Mystic", th: "นักลึกลับ" },
        description: { en: "A mysterious practitioner of esoteric arts", th: "ผู้เชี่ยวชาญในศาสตร์ลึกลับและลี้ลับ" },
      },
      rogue: {
        name: { en: "Rogue", th: "นักลอบ" },
        description: { en: "A stealthy character skilled in stealth and precision", th: "ตัวละครลับๆ ล่อๆ ที่เชี่ยวชาญในการซ่อนตัวและความแม่นยำ" },
      },
      spellblade: {
        name: { en: "SpellBlade", th: "ดาบเวทย์" },
        description: { en: "A warrior who wields both blade and magic", th: "นักรบผู้ใช้ทั้งดาบและเวทมนตร์" },
      },
      shaman: {
        name: { en: "Shaman", th: "ชามาน" },
        description: { en: "A spiritual guide with nature magic", th: "ผู้นำทางจิตวิญญาณที่มีเวทมนตร์ธรรมชาติ" },
      },
      barbarian: {
        name: { en: "Barbarian", th: "นักรบป่าเถื่อน" },
        description: { en: "A fierce warrior who channels primal fury", th: "นักรบดุร้ายที่ปลุกพลังดิบเถื่อน" },
      },
      warrior: {
        name: { en: "Warrior", th: "นักรบ" },
        description: { en: "A skilled fighter specializing in combat", th: "นักสู้ผู้เชี่ยวชาญในการต่อสู้" },
      },
      knight: {
        name: { en: "Knight", th: "อัศวิน" },
        description: { en: "A noble warrior bound by honor", th: "นักรบผู้สูงส่งที่มีเกียรติธรรม" },
      },
      guardian: {
        name: { en: "Guardian", th: "ผู้พิทักษ์" },
        description: { en: "A defensive protector with shield mastery", th: "ผู้ป้องกันผู้เชี่ยวชาญในการใช้โล่" },
      },
      paladin: {
        name: { en: "Paladin", th: "พาลาดิน" },
        description: { en: "A holy warrior of divine justice", th: "นักรบศักดิ์สิทธิ์แห่งความยุติธรรม" },
      },
      druid: {
        name: { en: "Druid", th: "ดรูอิด" },
        description: { en: "A nature guardian with shape-shifting powers", th: "ผู้พิทักษ์ธรรมชาติที่มีพลังแปลงร่าง" },
      },
      monk: {
        name: { en: "Monk", th: "นักพรต" },
        description: { en: "A disciplined martial artist", th: "นักศิลปะการต่อสู้ที่มีวินัย" },
      },
      warlock: {
        name: { en: "Warlock", th: "วาร์ล็อค" },
        description: { en: "A wielder of dark and chaotic magic", th: "ผู้ใช้เวทมนตร์มืดและวุ่นวาย" },
      },
      duelist: {
        name: { en: "Duelist", th: "นักดวล" },
        description: { en: "An agile fencer with precision strikes", th: "นักดาบที่คล่องแคล่วและแม่นยำ" },
      },
      witch: {
        name: { en: "Witch", th: "แม่มด" },
        description: { en: "A caster of curses and hexes", th: "ผู้ใช้คำสาปและมนตร์ดำ" },
      },
      inquisitor: {
        name: { en: "Inquisitor", th: "นักสืบ" },
        description: { en: "A hunter of heretics and the corrupted", th: "นักล่าผู้ลบหลู่และผู้ที่เสื่อมทราม" },
      },
      scholar: {
        name: { en: "Scholar", th: "นักวิชาการ" },
        description: { en: "A learned master of knowledge and magic", th: "ผู้เชี่ยวชาญความรู้และเวทมนตร์" },
      },
      engineer: {
        name: { en: "Engineer", th: "วิศวกร" },
        description: { en: "A creator of mechanical wonders", th: "ผู้สร้างสิ่งประดิษฐ์กลไก" },
      },
      nomad: {
        name: { en: "Nomad", th: "คนเร่ร่อน" },
        description: { en: "A wanderer skilled in survival and adaptation", th: "ผู้เร่ร่อนที่เชี่ยวชาญการเอาชีวิตรอดและการปรับตัว" },
      },
    },
    // Background names and descriptions
    backgrounds: {
      noble: {
        name: { en: "Noble", th: "ขุนนาง" },
        description: { en: "Born into wealth and privilege", th: "เกิดในความมั่งคั่งและอภิสิทธิ์" },
      },
      peasant: {
        name: { en: "Peasant", th: "ชาวนา" },
        description: { en: "Raised in rural farming communities", th: "เติบโตในชุมชนเกษตรกรรมชนบท" },
      },
      merchant: {
        name: { en: "Merchant", th: "พ่อค้า" },
        description: { en: "Trained in trade and commerce", th: "ได้รับการฝึกฝนในด้านการค้าและการพาณิชย์" },
      },
      scholar: {
        name: { en: "Scholar", th: "นักวิชาการ" },
        description: { en: "Educated in libraries and academies", th: "ได้รับการศึกษาในห้องสมุดและสถาบันการศึกษา" },
      },
      artisan: {
        name: { en: "Artisan", th: "ช่างฝีมือ" },
        description: { en: "Skilled in various crafts and trades", th: "เชี่ยวชาญในงานหัตถกรรมและอาชีพต่างๆ" },
      },
      soldier: {
        name: { en: "Soldier", th: "ทหาร" },
        description: { en: "Former military service", th: "เคยรับราชการทหาร" },
      },
    },
  },
};

// Utility function to get localized text
export const getLocalizedText: GetLocalizedText = (
  text: LocalizedText,
  language: Language,
): string => {
  return text[language] || text.en; // Fallback to English if translation missing
};

// Current language state with reactive updates
let currentLanguage: Language = "en";
const listeners: Array<(language: Language) => void> = [];

export const getCurrentLanguage = (): Language => currentLanguage;

export const setCurrentLanguage = (language: Language): void => {
  if (currentLanguage !== language) {
    currentLanguage = language;
    // Notify all listeners of language change
    listeners.forEach((listener) => listener(language));
  }
};

// Subscribe to language changes
export const subscribeToLanguageChanges = (
  listener: (language: Language) => void,
): (() => void) => {
  listeners.push(listener);
  return () => {
    const index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  };
};

// Convenience function to get text in current language
export const t = (text: LocalizedText): string => {
  return getLocalizedText(text, currentLanguage);
};

// Hook-like function for React components to use reactive localization
export const useLocalization = () => {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const unsubscribe = subscribeToLanguageChanges(() => {
      forceUpdate((prev) => prev + 1);
    });
    return unsubscribe;
  }, []);

  return {
    currentLanguage: getCurrentLanguage(),
    t: (text: LocalizedText) => getLocalizedText(text, currentLanguage),
    setLanguage: setCurrentLanguage,
  };
};
