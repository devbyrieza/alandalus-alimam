# How to Prevent the "502 Bad Gateway" Permanently

The 502 error happens because your application container gets a **new IP address** every time you deploy, but Nginx keeps trying to connect to the **old IP**.

To fix this once and for all, follow these steps:

## Step 1: Configure Coolify to Expose Port 3000

1.  Log in to your **Coolify Dashboard**.
2.  Navigate to your application: **riezaekatomara/pp-alimam**.
3.  Go to **Configuration** -> **General** (or **Advanced**).
4.  Find the **"Ports Exposes"** or **"Docker Option > Ports"** section.
5.  Enter: `3000:3000`
    *   **CRITICAL:** Make sure there are NO spaces or hidden characters. Type it manually: `3000` then `:` then `3000`.
6.  **Save** and **Redeploy** the application.

### Troubleshooting "Invalid Port Syntax"
If you see an error like `invalid JSON: invalid port '3000:3000'`, try these variations:
*   Try adding quotes: `"3000:3000"`
*   If there is a specific box for "Port Mapping", ensure you are following its example format.
*   Check if you accidentally pasted a specialized character. clear the field and type `3000:3000` simply.

## Step 2: Update Nginx to use Localhost

Once you have redeployed with the port exposed:

1.  SSH into your server.
2.  Edit the Nginx configuration:
    ```bash
    sudo nano /etc/nginx/sites-available/al-imam
    ```
3.  Change the `proxy_pass` line to point to `localhost`:
    ```nginx
    # CHANGE THIS:
    # proxy_pass http://10.X.X.X:3000;

    # TO THIS:
    proxy_pass http://127.0.0.1:3000;
    ```
4.  Save the file (`Ctrl+X`, `Y`, `Enter`).
5.  Reload Nginx:
    ```bash
    sudo nginx -t && sudo systemctl reload nginx
    ```

## Result
Now, Nginx will always communicate with your app at `127.0.0.1:3000`. Even if the container IP changes in the future, the port forwarding will keep the connection stable. You won't need to manually fix it ever again!
