import React, { useState, useEffect, useRef } from "react";
import {
  Terminal,
  FolderOpen,
  FileSearch,
  ShieldCheck,
  BrainCircuit,
  LayoutDashboard,
  FileText,
  Settings,
  Activity,
  ArrowRight,
  ArrowLeft,
  Download,
  HelpCircle,
  X,
  CheckCircle2,
  Cpu,
  Database,
  Copy,
  Check,
} from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast, Toaster } from "sonner";

// ── BAT FILE CONTENT ──────────────────────────────────────────────────────────
// Note: no backtick characters used inside so the JS template literal stays valid
const makeBatContent = () =>
  [
    "@echo off",
    "setlocal EnableExtensions EnableDelayedExpansion",
    "chcp 65001 >nul 2>&1",
    "mode con: cols=120 lines=50 >nul 2>&1",
    "color 0A",
    "title  NASBOX COMMANDER PRO V5.0 ^| EXCLUSIVE EDITION",
    "",
    "rem ================================================================",
    "rem  NASBOX COMMANDER PRO V5.0 - EXCLUSIVE EDITION",
    "rem  Unterstuetzte Dateitypen: .bat .ps1 .exe .cmd .py",
    "rem  Anpassungen:  Abschnitt SLOT KONFIGURATION bearbeiten",
    "rem ================================================================",
    "",
    "rem === BASISPFADE ==================================================",
    'set "SCRIPTS=C:\\Scripts"',
    'set "AI=C:\\ai"',
    'set "NAS=Y:\\"',
    'set "LOGS=Y:\\LOGS"',
    "",
    "rem === SYSTEMDATEIEN ===============================================",
    'set "AUTOSORT_PS1=%SCRIPTS%\\NASBOX_AutoSort.ps1"',
    'set "OCR_BAT=%SCRIPTS%\\start_ocr_watcher.bat"',
    'set "VERIFY_PS1=%SCRIPTS%\\verify_backup.ps1"',
    'set "GROKSORT_PS1=%SCRIPTS%\\NASBOX5G2_GrokSort.ps1"',
    'set "AI_BAT=%AI%\\start_stable_diffusion.bat"',
    "",
    "rem === TASKNAMEN ===================================================",
    'set "TASK_AUTOSORT=NASBOX_AutoSort"',
    'set "TASK_OCR=NASBOX_OCRWatcher"',
    'set "TASK_VERIFY=NASBOX_VerifyBackup"',
    'set "TASK_GROKSORT=NASBOX_GrokSort"',
    'set "TASK_AI=NASBOX_AIStart"',
    "",
    "rem ================================================================",
    "rem  SLOT KONFIGURATION - EIGENE DATEIEN HIER EINTRAGEN",
    "rem  Format:  SLOTX_LABEL = Anzeigename im Menue",
    "rem           SLOTX_FILE  = Vollstaendiger Pfad zur Datei",
    "rem  Typen:   .bat  .ps1  .exe  .cmd  .py",
    "rem ================================================================",
    'set "SLOT1_LABEL=Freier Slot 1"',
    'set "SLOT1_FILE=C:\\Scripts\\slot1.bat"',
    'set "SLOT2_LABEL=Freier Slot 2"',
    'set "SLOT2_FILE=C:\\Scripts\\slot2.bat"',
    'set "SLOT3_LABEL=Freier Slot 3"',
    'set "SLOT3_FILE=C:\\Scripts\\slot3.bat"',
    'set "SLOT4_LABEL=Freier Slot 4"',
    'set "SLOT4_FILE=C:\\Scripts\\slot4.bat"',
    'set "SLOT5_LABEL=Freier Slot 5"',
    'set "SLOT5_FILE=C:\\Scripts\\slot5.bat"',
    'set "SLOT6_LABEL=Freier Slot 6"',
    'set "SLOT6_FILE=C:\\Scripts\\slot6.bat"',
    "",
    'set "PAGE=1"',
    "goto MENU",
    "",
    "rem ================================================================",
    ":MENU",
    "cls",
    "call :DrawBanner",
    "echo.",
    "call :ShowStatusBar",
    "echo.",
    'if "%PAGE%"=="1" goto MENU1',
    'if "%PAGE%"=="2" goto MENU2',
    'if "%PAGE%"=="3" goto MENU3',
    'set "PAGE=1"',
    "goto MENU",
    "",
    "rem ================================================================",
    ":MENU1",
    "echo  ^╔══════════════════════════════════════════════════════════════════════════════════════════════════════════╗",
    "echo  ^║  HAUPTMENUE  ^|  SEITE 1 VON 3  ^|  Kernfunktionen                                                       ^║",
    "echo  ^╠══════════════════════════════════════════════════════════════════════════════════════════════════════════╣",
    "echo  ^║                                                                                                          ^║",
    "echo  ^║   [1]  Incoming AutoSort starten         [PowerShell]                                                    ^║",
    "echo  ^║   [2]  OCR Watcher starten               [Batch]                                                         ^║",
    "echo  ^║   [3]  Backup VERIFY pruefen             [PowerShell]                                                    ^║",
    "echo  ^║   [4]  GrokSort starten                  [PS1 / Python]                                                  ^║",
    "echo  ^║   [5]  NAS Ordner oeffnen                [Explorer]                                                      ^║",
    "echo  ^║   [6]  Logs oeffnen                      [Y:\\LOGS]                                                       ^║",
    "echo  ^║   [7]  AI Produktion starten             [Batch]                                                         ^║",
    "echo  ^║   [8]  Systemcheck anzeigen              [Diagnose]                                                      ^║",
    "echo  ^║                                                                                                          ^║",
    "echo  ^╠══════════════════════════════════════════════════════════════════════════════════════════════════════════╣",
    "echo  ^║   [9]  Weiter zu Seite 2    [H]  HILFE - Neue Dateien einfuegen    [0]  Beenden                         ^║",
    "echo  ^╚══════════════════════════════════════════════════════════════════════════════════════════════════════════╝",
    "echo.",
    'set /p "CHOICE=  Auswahl: "',
    'if /i "%CHOICE%"=="1" goto RUN_AUTOSORT',
    'if /i "%CHOICE%"=="2" goto RUN_OCR',
    'if /i "%CHOICE%"=="3" goto RUN_VERIFY',
    'if /i "%CHOICE%"=="4" goto RUN_GROKSORT',
    'if /i "%CHOICE%"=="5" goto OPEN_NAS',
    'if /i "%CHOICE%"=="6" goto OPEN_LOGS',
    'if /i "%CHOICE%"=="7" goto RUN_AI',
    'if /i "%CHOICE%"=="8" goto SYSTEMCHECK',
    'if /i "%CHOICE%"=="9" set "PAGE=2" & goto MENU',
    'if /i "%CHOICE%"=="H" goto HILFE',
    'if /i "%CHOICE%"=="0" goto ENDE',
    "goto BADCHOICE",
    "",
    "rem ================================================================",
    ":MENU2",
    "echo  ^╔══════════════════════════════════════════════════════════════════════════════════════════════════════════╗",
    "echo  ^║  HAUPTMENUE  ^|  SEITE 2 VON 3  ^|  System ^& Erweiterungen                                               ^║",
    "echo  ^╠══════════════════════════════════════════════════════════════════════════════════════════════════════════╣",
    "echo  ^║                                                                                                          ^║",
    "echo  ^║   [10]  Backup PRO starten               [Batch]                                                         ^║",
    "echo  ^║   [11]  Dashboard anzeigen               [Diagnose]                                                      ^║",
    "echo  ^║   [12]  Backup INIT Neuaufbau            [Batch]                                                         ^║",
    "echo  ^║   [13]  %SLOT1_LABEL%                                                                 ^║",
    "echo  ^║   [14]  %SLOT2_LABEL%                                                                 ^║",
    "echo  ^║   [15]  %SLOT3_LABEL%                                                                 ^║",
    "echo  ^║                                                                                                          ^║",
    "echo  ^╠══════════════════════════════════════════════════════════════════════════════════════════════════════════╣",
    "echo  ^║   [19]  Weiter zu Seite 3    [H]  HILFE - Neue Dateien einfuegen    [0]  Beenden                        ^║",
    "echo  ^╚══════════════════════════════════════════════════════════════════════════════════════════════════════════╝",
    "echo.",
    'set /p "CHOICE=  Auswahl: "',
    'if /i "%CHOICE%"=="10" goto BACKUP_PRO',
    'if /i "%CHOICE%"=="11" goto DASHBOARD',
    'if /i "%CHOICE%"=="12" goto BACKUP_INIT',
    'if /i "%CHOICE%"=="13" goto SLOT1',
    'if /i "%CHOICE%"=="14" goto SLOT2',
    'if /i "%CHOICE%"=="15" goto SLOT3',
    'if /i "%CHOICE%"=="19" set "PAGE=3" & goto MENU',
    'if /i "%CHOICE%"=="H" goto HILFE',
    'if /i "%CHOICE%"=="0" goto ENDE',
    "goto BADCHOICE",
    "",
    "rem ================================================================",
    ":MENU3",
    "echo  ^╔══════════════════════════════════════════════════════════════════════════════════════════════════════════╗",
    "echo  ^║  HAUPTMENUE  ^|  SEITE 3 VON 3  ^|  Freie Slots                                                          ^║",
    "echo  ^╠══════════════════════════════════════════════════════════════════════════════════════════════════════════╣",
    "echo  ^║                                                                                                          ^║",
    "echo  ^║   [16]  %SLOT4_LABEL%                                                                 ^║",
    "echo  ^║   [17]  %SLOT5_LABEL%                                                                 ^║",
    "echo  ^║   [18]  %SLOT6_LABEL%                                                                 ^║",
    "echo  ^║                                                                                                          ^║",
    "echo  ^║   Weitere Slots: oben im Skript unter SLOT KONFIGURATION anpassen.                                       ^║",
    "echo  ^║   Tippe [H] fuer eine ausfuehrliche Anleitung.                                                           ^║",
    "echo  ^║                                                                                                          ^║",
    "echo  ^╠══════════════════════════════════════════════════════════════════════════════════════════════════════════╣",
    "echo  ^║   [9]  Zurueck zu Seite 1    [H]  HILFE - Neue Dateien einfuegen    [0]  Beenden                        ^║",
    "echo  ^╚══════════════════════════════════════════════════════════════════════════════════════════════════════════╝",
    "echo.",
    'set /p "CHOICE=  Auswahl: "',
    'if /i "%CHOICE%"=="16" goto SLOT4',
    'if /i "%CHOICE%"=="17" goto SLOT5',
    'if /i "%CHOICE%"=="18" goto SLOT6',
    'if /i "%CHOICE%"=="9"  set "PAGE=1" & goto MENU',
    'if /i "%CHOICE%"=="H"  goto HILFE',
    'if /i "%CHOICE%"=="0"  goto ENDE',
    "goto BADCHOICE",
    "",
    "rem ================================================================",
    "rem  HILFE - ANLEITUNG NEUE DATEIEN EINFUEGEN",
    "rem ================================================================",
    ":HILFE",
    "cls",
    "color 0B",
    "call :DrawBanner",
    "echo.",
    "echo  ^╔══════════════════════════════════════════════════════════════════════════════════════════════════════════╗",
    "echo  ^║  HILFE  ^|  WIE FUEGE ICH EIGENE DATEIEN IN NASBOX COMMANDER EIN?                                        ^║",
    "echo  ^╠══════════════════════════════════════════════════════════════════════════════════════════════════════════╣",
    "echo  ^║                                                                                                          ^║",
    "echo  ^║  SCHRITT 1 - Diese Datei im Editor oeffnen                                                               ^║",
    "echo  ^║  -----------------------------------------------                                                         ^║",
    "echo  ^║   Rechtsklick auf NASBOX_Commander_Pro.bat  ^>  Bearbeiten  oder  Mit Notepad oeffnen                     ^║",
    "echo  ^║                                                                                                          ^║",
    "echo  ^║  SCHRITT 2 - Den Abschnitt SLOT KONFIGURATION finden (ca. Zeile 40)                                      ^║",
    "echo  ^║  -----------------------------------------------                                                         ^║",
    "echo  ^║   Strg+F  suchen:   SLOT KONFIGURATION                                                                   ^║",
    "echo  ^║                                                                                                          ^║",
    "echo  ^║  SCHRITT 3 - Slot-Name und Pfad anpassen                                                                 ^║",
    "echo  ^║  -----------------------------------------------                                                         ^║",
    'echo  ^║   set "SLOT1_LABEL=Mein eigenes Skript"                                                                  ^║',
    'echo  ^║   set "SLOT1_FILE=C:\\MeineSkripte\\mein_skript.bat"                                                      ^║',
    "echo  ^║                                                                                                          ^║",
    "echo  ^║  UNTERSTUETZTE DATEITYPEN                                                                                 ^║",
    "echo  ^║  -----------------------------------------------                                                         ^║",
    'echo  ^║   .bat  =^>  call "C:\\Pfad\\datei.bat"                                                                   ^║',
    'echo  ^║   .ps1  =^>  powershell -ExecutionPolicy Bypass -File "C:\\Pfad\\datei.ps1"                               ^║',
    'echo  ^║   .exe  =^>  start "" "C:\\Pfad\\programm.exe"                                                            ^║',
    'echo  ^║   .cmd  =^>  call "C:\\Pfad\\datei.cmd"                                                                   ^║',
    'echo  ^║   .py   =^>  python "C:\\Pfad\\datei.py"                                                                  ^║',
    "echo  ^║                                                                                                          ^║",
    "echo  ^║  BEISPIEL - FileZilla in Slot 1                                                                          ^║",
    "echo  ^║  -----------------------------------------------                                                         ^║",
    'echo  ^║   set "SLOT1_LABEL=FileZilla FTP Client"                                                                 ^║',
    'echo  ^║   set "SLOT1_FILE=C:\\Program Files\\FileZilla FTP Client\\filezilla.exe"                                  ^║',
    "echo  ^║                                                                                                          ^║",
    "echo  ^║  BEISPIEL - PowerShell Skript in Slot 2                                                                  ^║",
    "echo  ^║  -----------------------------------------------                                                         ^║",
    'echo  ^║   set "SLOT2_LABEL=NAS Cleanup PS1"                                                                      ^║',
    'echo  ^║   set "SLOT2_FILE=C:\\Scripts\\cleanup.ps1"                                                               ^║',
    "echo  ^║                                                                                                          ^║",
    "echo  ^║  WINDOWS TASK SCHEDULER einrichten                                                                        ^║",
    "echo  ^║  -----------------------------------------------                                                         ^║",
    "echo  ^║   1. Win+R  =^>  taskschd.msc  =^>  Enter                                                                ^║",
    "echo  ^║   2. Einfache Aufgabe erstellen  =^>  Name: NASBOX_MeinTask                                               ^║",
    "echo  ^║   3. Trigger: Beim Start  oder  Manuell                                                                   ^║",
    "echo  ^║   4. Aktion: Programm starten  =^>  Pfad zur .bat / .ps1 / .exe                                          ^║",
    "echo  ^║   5. Fertig  =^>  Task erscheint im Commander unter den Kernfunktionen                                    ^║",
    "echo  ^║                                                                                                          ^║",
    "echo  ^╚══════════════════════════════════════════════════════════════════════════════════════════════════════════╝",
    "echo.",
    "color 0A",
    "pause",
    "goto MENU",
    "",
    "rem ================================================================",
    ":RUN_AUTOSORT",
    "cls",
    "call :DrawBanner",
    "echo.",
    "echo  ^║  Incoming AutoSort wird gestartet...",
    "echo.",
    'call :RunTask "%TASK_AUTOSORT%"',
    "goto RETURN_MENU",
    "",
    ":RUN_OCR",
    "cls",
    "call :DrawBanner",
    "echo.",
    "echo  ^║  OCR Watcher wird gestartet...",
    "echo.",
    'call :RunTask "%TASK_OCR%"',
    "goto RETURN_MENU",
    "",
    ":RUN_VERIFY",
    "cls",
    "call :DrawBanner",
    "echo.",
    "echo  ^║  Backup VERIFY wird gestartet...",
    "echo.",
    'call :RunTask "%TASK_VERIFY%"',
    "goto RETURN_MENU",
    "",
    ":RUN_GROKSORT",
    "cls",
    "call :DrawBanner",
    "echo.",
    "echo  ^║  GrokSort wird gestartet...",
    "echo.",
    'call :RunTask "%TASK_GROKSORT%"',
    "goto RETURN_MENU",
    "",
    ":RUN_AI",
    "cls",
    "call :DrawBanner",
    "echo.",
    "echo  ^║  AI Produktion wird gestartet...",
    "echo.",
    'call :RunTask "%TASK_AI%"',
    "goto RETURN_MENU",
    "",
    ":OPEN_NAS",
    "cls",
    "call :DrawBanner",
    "echo.",
    'if exist "%NAS%" (',
    '    start "" "%NAS%"',
    "    echo  [OK]    NAS geoeffnet: %NAS%",
    ") else (",
    "    echo  [FEHLT] NAS nicht erreichbar: %NAS%",
    ")",
    "goto RETURN_MENU",
    "",
    ":OPEN_LOGS",
    "cls",
    "call :DrawBanner",
    "echo.",
    'if exist "%LOGS%" (',
    '    start "" "%LOGS%"',
    "    echo  [OK]    Logs geoeffnet: %LOGS%",
    ") else (",
    "    echo  [FEHLT] Log-Pfad nicht gefunden: %LOGS%",
    ")",
    "goto RETURN_MENU",
    "",
    ":SYSTEMCHECK",
    "cls",
    "color 0B",
    "call :DrawBanner",
    "echo.",
    "echo  ^╔══════════════════════════════════════════════════════════════════════════╗",
    "echo  ^║  SYSTEMCHECK                                                             ^║",
    "echo  ^╠══════════════════════════════════════════════════════════════════════════╣",
    'call :CheckPath "Scripts Ordner" "%SCRIPTS%"',
    'call :CheckPath "AI Ordner"      "%AI%"',
    'call :CheckPath "NAS Pfad"       "%NAS%"',
    'call :CheckPath "Log Pfad"       "%LOGS%"',
    "echo  ^║                                                                          ^║",
    'call :CheckFile "AutoSort PS1"   "%AUTOSORT_PS1%"',
    'call :CheckFile "OCR BAT"        "%OCR_BAT%"',
    'call :CheckFile "Verify PS1"     "%VERIFY_PS1%"',
    'call :CheckFile "GrokSort PS1"   "%GROKSORT_PS1%"',
    'call :CheckFile "AI BAT"         "%AI_BAT%"',
    "echo  ^║                                                                          ^║",
    'call :CheckTask "%TASK_AUTOSORT%"',
    'call :CheckTask "%TASK_OCR%"',
    'call :CheckTask "%TASK_VERIFY%"',
    'call :CheckTask "%TASK_GROKSORT%"',
    'call :CheckTask "%TASK_AI%"',
    "echo  ^╚══════════════════════════════════════════════════════════════════════════╝",
    "color 0A",
    "goto RETURN_MENU",
    "",
    ":BACKUP_PRO",
    "cls",
    "call :DrawBanner",
    "echo.",
    "echo  ^║  Backup PRO - Platzhalter. Eigene BAT/PS1 in SLOT KONFIGURATION eintragen.",
    "echo.",
    "goto RETURN_MENU",
    "",
    ":DASHBOARD",
    "cls",
    "color 0B",
    "call :DrawBanner",
    "echo.",
    "echo  ^╔══════════════════════════════════════════════════════════════════════════╗",
    "echo  ^║  DASHBOARD - SCHNELLSTATUS                                               ^║",
    "echo  ^╠══════════════════════════════════════════════════════════════════════════╣",
    'call :CheckPath "NAS"  "%NAS%"',
    'call :CheckPath "LOGS" "%LOGS%"',
    'call :CheckTask "%TASK_AUTOSORT%"',
    'call :CheckTask "%TASK_GROKSORT%"',
    "echo  ^╚══════════════════════════════════════════════════════════════════════════╝",
    "color 0A",
    "goto RETURN_MENU",
    "",
    ":BACKUP_INIT",
    "cls",
    "call :DrawBanner",
    "echo.",
    "echo  ^║  Backup INIT Neuaufbau - Platzhalter. Eigene BAT/PS1 eintragen.",
    "echo.",
    "goto RETURN_MENU",
    "",
    ":SLOT1",
    'call :RunSlot "%SLOT1_LABEL%" "%SLOT1_FILE%"',
    "goto RETURN_MENU",
    ":SLOT2",
    'call :RunSlot "%SLOT2_LABEL%" "%SLOT2_FILE%"',
    "goto RETURN_MENU",
    ":SLOT3",
    'call :RunSlot "%SLOT3_LABEL%" "%SLOT3_FILE%"',
    "goto RETURN_MENU",
    ":SLOT4",
    'call :RunSlot "%SLOT4_LABEL%" "%SLOT4_FILE%"',
    "goto RETURN_MENU",
    ":SLOT5",
    'call :RunSlot "%SLOT5_LABEL%" "%SLOT5_FILE%"',
    "goto RETURN_MENU",
    ":SLOT6",
    'call :RunSlot "%SLOT6_LABEL%" "%SLOT6_FILE%"',
    "goto RETURN_MENU",
    "",
    "rem ================================================================",
    ":RunSlot",
    "cls",
    "call :DrawBanner",
    "echo.",
    "echo  ^║  Starte: %~1",
    "echo.",
    'if not exist "%~2" (',
    "    echo  [FEHLT] Datei nicht gefunden:",
    "    echo          %~2",
    "    echo.",
    "    echo  [HILFE] Pfad in SLOT KONFIGURATION anpassen. Taste [H] im Menue.",
    "    goto :EOF",
    ")",
    'set "FEXT=%~x2"',
    'if /i "%FEXT%"==".ps1" (',
    '    powershell -ExecutionPolicy Bypass -File "%~2"',
    ') else if /i "%FEXT%"==".exe" (',
    '    start "" "%~2"',
    ') else if /i "%FEXT%"==".py" (',
    '    python "%~2"',
    ") else (",
    '    call "%~2"',
    ")",
    "echo.",
    "echo  [OK]  Ausgefuehrt: %~1",
    "exit /b",
    "",
    "rem ================================================================",
    ":RunTask",
    "schtasks /query /tn %1 >nul 2>&1",
    "if errorlevel 1 (",
    "    echo  [FEHLT] Task nicht gefunden: %~1",
    "    echo  [INFO]  Taste [H] im Menue fuer Einrichtungsanleitung.",
    "    exit /b",
    ")",
    "schtasks /run /tn %1 >nul 2>&1",
    "if errorlevel 1 (",
    "    echo  [FEHLER] Task konnte nicht gestartet werden: %~1",
    "    exit /b",
    ")",
    "echo  [OK]    Task gestartet: %~1",
    "exit /b",
    "",
    ":CheckPath",
    'if exist "%~2" (',
    "    echo  ^║  [OK]    %~1 : %~2",
    ") else (",
    "    echo  ^║  [FEHLT] %~1 : %~2",
    ")",
    "exit /b",
    "",
    ":CheckFile",
    'if exist "%~2" (',
    "    echo  ^║  [OK]    %~1 : vorhanden",
    ") else (",
    "    echo  ^║  [FEHLT] %~1 : fehlt",
    ")",
    "exit /b",
    "",
    ":CheckTask",
    'schtasks /query /tn "%~1" >nul 2>&1',
    "if errorlevel 1 (",
    "    echo  ^║  [FEHLT] Task: %~1",
    ") else (",
    "    echo  ^║  [OK]    Task: %~1",
    ")",
    "exit /b",
    "",
    "rem ================================================================",
    ":ShowStatusBar",
    'schtasks /query /tn "%TASK_GROKSORT%" >nul 2>&1',
    'set "TASKSTAT=PRUEFEN"',
    'if not errorlevel 1 set "TASKSTAT=OK"',
    'if exist "%NAS%" (set "NASSTAT=ONLINE") else (set "NASSTAT=OFFLINE")',
    'if exist "%LOGS%" (set "LOGSTAT=OK") else (set "LOGSTAT=FEHLT")',
    "echo  ^║  NAS: [%NASSTAT%]   LOGS: [%LOGSTAT%]   TASKS: [%TASKSTAT%]   V5.0 EXCLUSIVE EDITION",
    "echo  ^╚══════════════════════════════════════════════════════════════════════════════════════════════════════════╝",
    "exit /b",
    "",
    "rem ================================================================",
    ":DrawBanner",
    "echo  ^╔══════════════════════════════════════════════════════════════════════════════════════════════════════════╗",
    "echo  ^║                                                                                                          ^║",
    "echo  ^║   NN    NN    AA    SSSSS  BBBBB    OOO   XX  XX      CCCC    OOO   MM    MM  MM    MM    AA    NN    NN ^║",
    "echo  ^║   NNN   NN   AAAA   S      B    B  O   O   XXXX      C       O   O  M MM MM  M MM MM   AAAA   NNN   NN ^║",
    "echo  ^║   NN N  NN  AA  AA  SSS    BBBBB   O   O    XX       C       O   O  M  M  M  M  M  M  AA  AA  NN N  NN ^║",
    "echo  ^║   NN  N NN  AAAAAA     S   B    B  O   O   XXXX      C       O   O  M     M  M     M  AAAAAA  NN  N NN ^║",
    "echo  ^║   NN   NNN  AA  AA  SSSSS  BBBBB    OOO   XX  XX      CCCC    OOO   M     M  M     M  AA  AA  NN   NNN ^║",
    "echo  ^║                                                                                                          ^║",
    "echo  ^║               C O M M A N D E R   P R O   V 5 . 0   --   E X C L U S I V E   E D I T I O N            ^║",
    "echo  ^╠══════════════════════════════════════════════════════════════════════════════════════════════════════════╣",
    "exit /b",
    "",
    "rem ================================================================",
    ":BADCHOICE",
    "echo.",
    "echo  [INFO] Ungueltige Eingabe. Bitte erneut waehlen.",
    "goto RETURN_MENU",
    "",
    ":RETURN_MENU",
    "echo.",
    "pause",
    "goto MENU",
    "",
    ":ENDE",
    "color 07",
    "echo.",
    "echo  NASBOX Commander Pro V5.0 beendet.",
    "timeout /t 2 >nul",
    "exit /b",
  ].join("\r\n");

// ── SHARED COMPONENTS ─────────────────────────────────────────────────────────

const STATUS_VARIANTS = {
  ok: "bg-green-500/10 text-green-400 border-green-500/20",
  warning: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  error: "bg-red-500/10 text-red-400 border-red-500/20",
  info: "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

const Badge = ({ children, variant = "ok", label }) => (
  <div
    className={`flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${STATUS_VARIANTS[variant]}`}
  >
    <div
      className={`w-1.5 h-1.5 rounded-full ${variant === "ok" ? "bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]" : variant === "warning" ? "bg-yellow-400" : "bg-blue-400"}`}
    />
    <span>{label}:</span>
    <span className="opacity-90">{children}</span>
  </div>
);

const ActionCard = ({
  id,
  title,
  description,
  icon: Icon,
  tech,
  onClick,
  isLoading,
}) => (
  <button
    onClick={onClick}
    disabled={isLoading}
    className={`group relative flex flex-col items-start p-5 bg-[#161b22]/60 hover:bg-[#1c2128] border border-[#30363d] hover:border-[#8b949e] transition-all duration-300 rounded-lg text-left overflow-hidden w-full ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
  >
    <div className="absolute top-2 right-4 text-[24px] font-black text-[#30363d] group-hover:text-[#484f58] transition-colors">
      {id}
    </div>
    <div className="mb-4 p-2.5 rounded-md bg-[#21262d] text-blue-400 group-hover:text-blue-300 transition-colors shadow-inner">
      <Icon size={24} />
    </div>
    <h3 className="text-sm font-bold text-[#c9d1d9] mb-1.5 group-hover:text-white transition-colors uppercase tracking-tight">
      {title}
    </h3>
    <p className="text-[11px] text-[#8b949e] leading-relaxed mb-4 min-h-[32px]">
      {description}
    </p>
    <div className="flex gap-2 flex-wrap">
      {tech.map((t) => (
        <span
          key={t}
          className="px-2 py-0.5 rounded text-[9px] font-bold bg-[#0d1117] border border-[#30363d] text-[#8b949e] uppercase tracking-widest"
        >
          {t}
        </span>
      ))}
    </div>
    <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-blue-500 transition-all duration-500" />
    {isLoading && (
      <div className="absolute inset-0 bg-[#0d1117]/40 flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )}
  </button>
);

// ── HILFE MODAL ───────────────────────────────────────────────────────────────

const HilfeModal = ({ onClose }) => {
  const steps = [
    {
      num: "01",
      title: "BAT-Datei im Editor öffnen",
      detail:
        'Rechtsklick auf NASBOX_Commander_Pro.bat → "Bearbeiten" oder mit Notepad++ öffnen.',
      color: "text-blue-400",
      border: "border-blue-500/30",
    },
    {
      num: "02",
      title: "SLOT KONFIGURATION finden",
      detail:
        "Strg+F suchen nach: SLOT KONFIGURATION\nDer Bereich beginnt ca. in Zeile 40.",
      color: "text-yellow-400",
      border: "border-yellow-500/30",
    },
    {
      num: "03",
      title: "Label und Pfad eintragen",
      detail:
        "SLOT1_LABEL = dein Anzeigename im Menü\nSLOT1_FILE = vollständiger Pfad zur Datei",
      color: "text-green-400",
      border: "border-green-500/30",
    },
    {
      num: "04",
      title: "Speichern & starten",
      detail: "Strg+S zum Speichern, dann BAT doppelklicken — fertig!",
      color: "text-purple-400",
      border: "border-purple-500/30",
    },
  ];

  const types = [
    {
      ext: ".bat",
      cmd: 'call "C:\\Pfad\\datei.bat"',
      color: "text-yellow-400",
    },
    {
      ext: ".ps1",
      cmd: 'powershell -ExecutionPolicy Bypass -File "C:\\Pfad\\datei.ps1"',
      color: "text-blue-400",
    },
    {
      ext: ".exe",
      cmd: 'start "" "C:\\Pfad\\programm.exe"',
      color: "text-green-400",
    },
    { ext: ".cmd", cmd: 'call "C:\\Pfad\\datei.cmd"', color: "text-cyan-400" },
    {
      ext: ".py",
      cmd: 'python "C:\\Pfad\\datei.py"',
      color: "text-orange-400",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0d1117] border border-[#30363d] rounded-xl shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[#161b22] border-b border-[#30363d] rounded-t-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-yellow-500/10 text-yellow-400">
              <HelpCircle size={18} />
            </div>
            <div>
              <h2 className="text-sm font-black uppercase tracking-widest text-white">
                HILFE — Eigene Dateien einfügen
              </h2>
              <p className="text-[10px] text-[#8b949e] mt-0.5 font-mono">
                NASBOX Commander Pro V5.0 · Exclusive Edition
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-[#21262d] text-[#8b949e] hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-6 space-y-8">
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8b949e] mb-4 flex items-center gap-2">
              <Activity size={12} className="text-blue-400" />{" "}
              Schritt-für-Schritt
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {steps.map((s) => (
                <div
                  key={s.num}
                  className={`p-4 rounded-lg bg-[#161b22] border ${s.border}`}
                >
                  <div
                    className={`text-2xl font-black mb-2 ${s.color} opacity-40`}
                  >
                    {s.num}
                  </div>
                  <div className={`text-xs font-bold mb-1 ${s.color}`}>
                    {s.title}
                  </div>
                  <div className="text-[11px] text-[#8b949e] leading-relaxed whitespace-pre-line">
                    {s.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8b949e] mb-4 flex items-center gap-2">
              <FileText size={12} className="text-blue-400" /> Unterstützte
              Dateitypen
            </h3>
            <div className="space-y-2">
              {types.map((t) => (
                <div
                  key={t.ext}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 rounded-lg bg-[#161b22] border border-[#30363d]"
                >
                  <span
                    className={`text-xs font-black font-mono ${t.color} w-10 shrink-0`}
                  >
                    {t.ext}
                  </span>
                  <code className="text-[10px] font-mono text-[#8b949e] bg-[#010409] px-3 py-1.5 rounded border border-[#30363d] w-full overflow-x-auto">
                    {t.cmd}
                  </code>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-lg bg-[#161b22] border border-[#30363d]">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8b949e] mb-3 flex items-center gap-2">
              <Settings size={12} className="text-blue-400" /> Windows Task
              Scheduler einrichten
            </h3>
            <ol className="space-y-2">
              {[
                "Win + R → taskschd.msc eingeben → Enter",
                '"Einfache Aufgabe erstellen" → Name: NASBOX_MeinTask',
                'Trigger: "Beim Start" oder "Manuell" wählen',
                'Aktion: "Programm starten" → Pfad zur .bat / .ps1 / .exe',
                "Fertig → Task erscheint ab sofort im Commander",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-[9px] font-black text-blue-500 bg-blue-500/10 border border-blue-500/20 rounded px-1.5 py-0.5 mt-0.5 shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-[11px] text-[#8b949e]">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="p-4 rounded-lg bg-[#010409] border border-green-500/20">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-green-400 mb-3">
              Beispiel — FileZilla in Slot 1 eintragen
            </h3>
            <pre className="text-[11px] font-mono text-green-300 leading-relaxed whitespace-pre-wrap">{`set "SLOT1_LABEL=FileZilla FTP Client"\nset "SLOT1_FILE=C:\\Program Files\\FileZilla FTP Client\\filezilla.exe"`}</pre>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-widest transition-colors"
          >
            Verstanden — Fenster schliessen
          </button>
        </div>
      </div>
    </div>
  );
};

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const [page, setPage] = useState(1);
  const [logs, setLogs] = useState([]);
  const [showHilfe, setShowHilfe] = useState(false);
  const [copied, setCopied] = useState(false);
  const logEndRef = useRef(null);

  const addLog = (msg) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev.slice(-9), `[${timestamp}] ${msg}`]);
  };

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const { data: status } = useQuery({
    queryKey: ["status"],
    queryFn: async () => {
      const res = await fetch("/api/commander");
      return res.json();
    },
    refetchInterval: 10000,
  });

  const runMutation = useMutation({
    mutationFn: async ({ action, id }) => {
      const res = await fetch("/api/commander", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, id }),
      });
      if (!res.ok) throw new Error("Fehler bei der Kommunikation");
      return res.json();
    },
    onSuccess: (data) => {
      toast.success(data.message);
      addLog(`OK: ${data.message}`);
    },
    onError: (err) => {
      toast.error(err.message);
      addLog(`ERROR: ${err.message}`);
    },
  });

  const handleAction = (action, id) => {
    addLog(`Starte: ${action}...`);
    runMutation.mutate({ action, id });
  };

  const handleDownload = () => {
    const content = makeBatContent();
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "NASBOX_Commander_Pro_V5.bat";
    a.click();
    URL.revokeObjectURL(url);
    addLog("Download: NASBOX_Commander_Pro_V5.bat");
    toast.success("Download gestartet — NASBOX_Commander_Pro_V5.bat");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(makeBatContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Skript in Zwischenablage kopiert");
  };

  const page1Actions = [
    {
      id: "01",
      title: "Incoming AutoSort",
      description: "Dateien automatisch sortieren via Task Scheduler",
      icon: Terminal,
      tech: ["PowerShell"],
    },
    {
      id: "02",
      title: "OCR Watcher",
      description: "Dokumente überwachen und Texterkennung starten",
      icon: FileSearch,
      tech: ["Batch"],
    },
    {
      id: "03",
      title: "Backup VERIFY",
      description: "Backup-Integrität prüfen und protokollieren",
      icon: ShieldCheck,
      tech: ["PowerShell"],
    },
    {
      id: "04",
      title: "GrokSort",
      description: "KI-gestützte Sortierung via PS1 oder Python",
      icon: BrainCircuit,
      tech: ["PS1", "Python"],
    },
    {
      id: "05",
      title: "NAS Ordner",
      description: "Explorer öffnet Y:\\ direkt",
      icon: FolderOpen,
      tech: ["Explorer"],
    },
    {
      id: "06",
      title: "AI Produktion",
      description: "Stable Diffusion und AI-Tools starten",
      icon: Cpu,
      tech: ["Batch"],
    },
    {
      id: "07",
      title: "Logs anzeigen",
      description: "Log-Ordner im Explorer öffnen",
      icon: FileText,
      tech: ["Y:\\LOGS"],
    },
    {
      id: "08",
      title: "Systemcheck",
      description: "Alle Pfade und Tasks prüfen",
      icon: Activity,
      tech: ["Diagnose"],
    },
  ];

  const page2Actions = [
    {
      id: "09",
      title: "Backup PRO",
      description: "Erweiterte Backup-Logik für kritische Daten",
      icon: ShieldCheck,
      tech: ["Batch"],
    },
    {
      id: "10",
      title: "Dashboard",
      description: "Schnellstatus aller Kernkomponenten",
      icon: LayoutDashboard,
      tech: ["Diagnose"],
    },
    {
      id: "11",
      title: "Backup INIT",
      description: "Neuaufbau der Backup-Struktur",
      icon: Database,
      tech: ["Batch"],
    },
    {
      id: "12",
      title: "Freier Slot 1",
      description: "Eigener Slot — Pfad in SLOT KONFIGURATION eintragen",
      icon: Settings,
      tech: [".bat/.ps1/.exe"],
    },
    {
      id: "13",
      title: "Freier Slot 2",
      description: "Eigener Slot — Pfad in SLOT KONFIGURATION eintragen",
      icon: Settings,
      tech: [".bat/.ps1/.exe"],
    },
    {
      id: "14",
      title: "Freier Slot 3–6",
      description: "Weitere Slots auf Seite 3 des BAT-Menüs",
      icon: Settings,
      tech: ["Seite 3"],
    },
    {
      id: "15",
      title: "Freier Slot 4",
      description: "Eigener Slot — Pfad in SLOT KONFIGURATION eintragen",
      icon: Settings,
      tech: [".bat/.ps1/.exe"],
    },
    {
      id: "16",
      title: "Freier Slot 5",
      description: "Eigener Slot — Pfad in SLOT KONFIGURATION eintragen",
      icon: Settings,
      tech: [".bat/.ps1/.exe"],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans selection:bg-blue-500/30">
      <Toaster position="top-right" theme="dark" richColors />
      {showHilfe && <HilfeModal onClose={() => setShowHilfe(false)} />}

      <div className="max-w-[1100px] mx-auto p-4 md:p-8 space-y-8">
        {/* ── DOWNLOAD SECTION ──────────────────────────────────── */}
        <div className="relative overflow-hidden rounded-xl border border-yellow-500/30 bg-gradient-to-r from-[#161b22] via-[#1c2128] to-[#161b22] p-6">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-transparent to-yellow-500/5 pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/60 to-transparent" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 shrink-0">
                <Download size={22} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded">
                    Exklusiv · V5.0
                  </span>
                  <span className="text-[9px] text-[#484f58] font-mono">
                    NASBOX_Commander_Pro_V5.bat
                  </span>
                </div>
                <h2 className="text-base font-black uppercase tracking-tight text-white mb-1">
                  BAT-Datei herunterladen
                </h2>
                <p className="text-[11px] text-[#8b949e] leading-relaxed max-w-md">
                  3-seitiges CMD-Menü · Automatische Dateitypenerkennung (.bat
                  .ps1 .exe .py) · HILFE-Fenster [H] · 6 freie Slots ·
                  Exklusives Box-Design
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 shrink-0">
              <button
                onClick={() => setShowHilfe(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#30363d] bg-[#21262d] hover:bg-[#30363d] text-[#8b949e] hover:text-white text-xs font-bold uppercase tracking-wider transition-all"
              >
                <HelpCircle size={14} /> HILFE
              </button>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#30363d] bg-[#21262d] hover:bg-[#30363d] text-[#8b949e] hover:text-white text-xs font-bold uppercase tracking-wider transition-all"
              >
                {copied ? (
                  <Check size={14} className="text-green-400" />
                ) : (
                  <Copy size={14} />
                )}
                {copied ? "Kopiert!" : "Kopieren"}
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-black uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.5)]"
              >
                <Download size={14} /> Download .bat
              </button>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-[#30363d] grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                icon: CheckCircle2,
                label: "3 Menü-Seiten",
                color: "text-green-400",
              },
              {
                icon: FileText,
                label: "BAT · PS1 · EXE · PY",
                color: "text-blue-400",
              },
              {
                icon: HelpCircle,
                label: "HILFE-Fenster [H]",
                color: "text-yellow-400",
              },
              {
                icon: Settings,
                label: "6 freie Slots",
                color: "text-purple-400",
              },
            ].map(({ icon: Icon, label, color }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon size={12} className={color} />
                <span className="text-[10px] text-[#8b949e] font-mono">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── HEADER ────────────────────────────────────────────── */}
        <header className="space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="px-2 py-0.5 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded text-[9px] font-black tracking-widest uppercase">
              Steam Edition · Messing
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase leading-none">
                Nasbox <br />
                <span className="text-blue-500">Commander</span>
              </h1>
              <p className="mt-2 text-xs font-mono text-[#8b949e] uppercase tracking-[0.2em]">
                Pro · V5.0 · {status?.lastBackup || "System Bereit"}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Badge
                label="NAS"
                variant={status?.nas === "ONLINE" ? "ok" : "error"}
              >
                {status?.nas || "OFFLINE"}
              </Badge>
              <Badge
                label="LOGS"
                variant={status?.logs === "OK" ? "ok" : "warning"}
              >
                {status?.logs || "CHECKING"}
              </Badge>
              <Badge label="AI" variant="warning">
                {status?.ai || "PRÜFEN"}
              </Badge>
              <Badge label="UPTIME" variant="info">
                24/7
              </Badge>
            </div>
          </div>
        </header>

        {/* ── SECTION TITLE ─────────────────────────────────────── */}
        <div className="flex items-center gap-3 border-b border-[#30363d] pb-2">
          <Activity size={14} className="text-blue-400" />
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8b949e]">
            {page === 1 ? "Kernfunktionen" : "System & Erweiterungen"}
          </h2>
        </div>

        {/* ── ACTION GRID ───────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(page === 1 ? page1Actions : page2Actions).map((action) => (
            <ActionCard
              key={action.id}
              {...action}
              isLoading={
                runMutation.isPending && runMutation.variables?.id === action.id
              }
              onClick={() => handleAction(action.title, action.id)}
            />
          ))}
        </div>

        {/* ── LOG MONITOR ───────────────────────────────────────── */}
        <div className="bg-[#010409] border border-[#30363d] rounded-lg p-4 font-mono text-[11px] h-[140px] overflow-hidden relative">
          <div className="absolute top-2 right-4 text-[#484f58] uppercase text-[9px] font-bold tracking-widest">
            Log Monitor
          </div>
          <div className="space-y-1">
            {logs.length === 0 && (
              <div className="text-[#484f58] italic">Warte auf Befehle...</div>
            )}
            {logs.map((log, i) => (
              <div
                key={i}
                className={
                  log.includes("ERROR")
                    ? "text-red-400"
                    : log.includes("OK")
                      ? "text-green-400"
                      : "text-blue-400"
                }
              >
                {log}
              </div>
            ))}
            <div ref={logEndRef} />
          </div>
        </div>

        {/* ── FOOTER ────────────────────────────────────────────── */}
        <footer className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-[#30363d]">
          <div className="flex gap-4">
            <button
              onClick={() => setPage(1)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-bold transition-all ${page === 1 ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]" : "bg-[#21262d] text-[#8b949e] hover:bg-[#30363d]"}`}
            >
              <ArrowLeft size={14} /> Seite 1
            </button>
            <button
              onClick={() => setPage(2)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-bold transition-all ${page === 2 ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]" : "bg-[#21262d] text-[#8b949e] hover:bg-[#30363d]"}`}
            >
              Seite 2 <ArrowRight size={14} />
            </button>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-[#484f58] uppercase">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            NASBOX Commander Pro · V5.0 · Build 2026.05.13
          </div>
        </footer>
      </div>

      <style jsx global>{`
        @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.5} }
        .animate-pulse { animation: pulse 2s cubic-bezier(0.4,0,0.6,1) infinite; }
        @keyframes spin { to{transform:rotate(360deg)} }
        .animate-spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
}
