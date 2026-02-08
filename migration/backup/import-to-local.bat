@echo off
echo ====================================
echo IMPORT DATA TO LOCAL POSTGRESQL
echo ====================================
echo.

REM Check if PostgreSQL is installed
"C:\Program Files\PostgreSQL\18\bin\psql.exe" --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: PostgreSQL belum terinstall!
    echo Silakan install PostgreSQL terlebih dahulu
    echo Lihat: POSTGRESQL-INSTALLATION.md
    pause
    exit /b 1
)

echo.
echo PostgreSQL found! Checking connection...
echo.

REM Test koneksi ke database
"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d postgres -h localhost -c "\q" >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Tidak bisa konek ke database!
    echo Pastikan PostgreSQL service sudah running
    echo Pastikan database ppdb_alimam sudah dibuat
    pause
    exit /b 1
)

echo.
echo Database connection OK!
echo.

REM Import data dari JSON files
echo Importing profiles...
"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U ppdb_user -d ppdb_alimam -h localhost -f profiles.json

echo Importing tahun_ajaran...
"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U ppdb_user -d ppdb_alimam -h localhost -f tahun_ajaran.json

echo Importing orang_tua...
"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U ppdb_user -d ppdb_alimam -h localhost -f orang_tua.json

echo Importing dokumen...
"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U ppdb_user -d ppdb_alimam -h localhost -f dokumen.json

echo Importing pembayaran...
"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U ppdb_user -d ppdb_alimam -h localhost -f pembayaran.json

echo Importing auth_users...
"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U ppdb_user -d ppdb_alimam -h localhost -f auth_users.json

echo Importing otp_verifications...
"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U ppdb_user -d ppdb_alimam -h localhost -f otp_verifications.json

echo.
echo ====================================
echo IMPORT COMPLETED!
echo ====================================
echo.
echo Total tables imported: 7
echo Check data dengan:
echo "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U ppdb_user -d ppdb_alimam -h localhost
echo.
pause
