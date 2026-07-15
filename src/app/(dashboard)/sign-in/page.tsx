import Link from "next/link";

export default function SignInPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div
        style={{
          width: "350px",
          padding: "24px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <h1>Sign In</h1>

        <p>This is a placeholder sign-in page.</p>

        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginTop: "20px",
          }}
        >
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />

          <button type="submit">Sign In</button>
        </form>

        <p style={{ marginTop: "20px" }}>
          Back to <Link href="/">Home</Link>
        </p>
      </div>
    </main>
  );
}