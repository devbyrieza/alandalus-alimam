@echo off
REM ============================================================================
REM BACKUP SUPABASE DATABASE - PPDB AL-IMAM
REM Jalankan script ini setelah PostgreSQL terinstall di Windows
REM ============================================================================

echo ============================================
echo   BACKUP SUPABASE - PPDB AL-IMAM
echo   %date% %time%
echo ============================================
echo.

REM Konfigurasi
set PGHOST=db.hcknodoayqarjbrzcgrp.supabase.co
set PGPORT=5432
set PGUSER=postgres
set PGDATABASE=postgres
set BACKUP_DIR=%~dp0

REM Set password (akan diminta via prompt jika tidak di-set)
set PGPASSWORD=SKBalimam26!

echo [1/4] Backup SCHEMA only...
pg_dump --host=%PGHOST% --port=%PGPORT% --username=%PGUSER% --dbname=%PGDATABASE% --schema=public --schema-only --no-owner --no-privileges -f "%BACKUP_DIR%supabase_schema.sql"
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Schema backup gagal!
    pause
    exit /b 1
)
echo       Schema backup berhasil!
echo.

echo [2/4] Backup DATA only...
pg_dump --host=%PGHOST% --port=%PGPORT% --username=%PGUSER% --dbname=%PGDATABASE% --schema=public --data-only --no-owner --no-privileges -f "%BACKUP_DIR%supabase_data.sql"
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Data backup gagal!
    pause
    exit /b 1
)
echo       Data backup berhasil!
echo.

echo [3/4] Backup LENGKAP (schema + data)...
pg_dump --host=%PGHOST% --port=%PGPORT% --username=%PGUSER% --dbname=%PGDATABASE% --schema=public --no-owner --no-privileges -f "%BACKUP_DIR%supabase_full.sql"
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Full backup gagal!
    pause
    exit /b 1
)
echo       Full backup berhasil!
echo.

echo [4/4] Backup FORMAT CUSTOM (untuk pg_restore)...
pg_dump --host=%PGHOST% --port=%PGPORT% --username=%PGUSER% --dbname=%PGDATABASE% --schema=public --no-owner --no-privileges -Fc -f "%BACKUP_DIR%supabase_full.dump"
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Custom format backup gagal!
    pause
    exit /b 1
)
echo       Custom format backup berhasil!
echo.

echo ============================================
echo   SEMUA BACKUP BERHASIL!
echo ============================================
echo.
echo File backup tersimpan di: %BACKUP_DIR%
echo.
echo Daftar file:
dir /b "%BACKUP_DIR%supabase_*"
echo.

REM Hapus password dari environment
set PGPASSWORD=

pause
