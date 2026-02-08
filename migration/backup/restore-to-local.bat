@echo off
REM ============================================================================
REM RESTORE BACKUP KE POSTGRESQL LOKAL
REM Jalankan setelah backup dan PostgreSQL lokal sudah diinstall
REM ============================================================================

echo ============================================
echo   RESTORE KE POSTGRESQL LOKAL
echo   %date% %time%
echo ============================================
echo.

set PGHOST=localhost
set PGPORT=5432
set PGUSER=postgres
set BACKUP_DIR=%~dp0

REM Prompt password PostgreSQL lokal
set /p PGPASSWORD=Masukkan password PostgreSQL lokal:

echo.
echo [1/4] Membuat database ppdb_alimam_test...
psql -h %PGHOST% -p %PGPORT% -U %PGUSER% -c "DROP DATABASE IF EXISTS ppdb_alimam_test;"
psql -h %PGHOST% -p %PGPORT% -U %PGUSER% -c "CREATE DATABASE ppdb_alimam_test;"
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Gagal membuat database!
    pause
    exit /b 1
)
echo       Database dibuat!
echo.

echo [2/4] Membuat extension uuid-ossp...
psql -h %PGHOST% -p %PGPORT% -U %PGUSER% -d ppdb_alimam_test -c "CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";"
if %ERRORLEVEL% NEQ 0 (
    echo WARNING: Extension mungkin sudah ada, lanjut...
)
echo       Extension uuid-ossp siap!
echo.

echo [3/4] Restore schema...
psql -h %PGHOST% -p %PGPORT% -U %PGUSER% -d ppdb_alimam_test -f "%BACKUP_DIR%supabase_schema.sql"
if %ERRORLEVEL% NEQ 0 (
    echo WARNING: Ada warning saat restore schema (mungkin normal)
)
echo       Schema restored!
echo.

echo [4/4] Restore data...
psql -h %PGHOST% -p %PGPORT% -U %PGUSER% -d ppdb_alimam_test -f "%BACKUP_DIR%supabase_data.sql"
if %ERRORLEVEL% NEQ 0 (
    echo WARNING: Ada warning saat restore data (mungkin normal)
)
echo       Data restored!
echo.

echo ============================================
echo   RESTORE SELESAI!
echo ============================================
echo.
echo Verifikasi dengan:
echo   psql -U postgres -d ppdb_alimam_test -c "\dt"
echo.
echo Atau gunakan Prisma Studio:
echo   npx prisma studio
echo.

set PGPASSWORD=
pause
