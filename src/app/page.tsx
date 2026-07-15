import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <header
        style={{
          padding: "20px 40px",
          borderBottom: "1px solid #eee",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>SchoolMS</h2>

        <nav style={{ display: "flex", gap: "16px" }}>
          <Link href="/sign-in">Sign In</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        style={{
          flex: 1,
          display: "grid",
          placeItems: "center",
          padding: "60px 20px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "700px" }}>
          <h1 style={{ fontSize: "42px", marginBottom: "16px" }}>
            School Management System
          </h1>

          <p style={{ fontSize: "18px", color: "#555" }}>
            A simple learning project to manage students, teachers, classes,
            attendance, and marks using Next.js.
          </p>

          <div
            style={{
              marginTop: "30px",
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/sign-in"
              style={{
                padding: "10px 16px",
                background: "black",
                color: "white",
                borderRadius: "6px",
              }}
            >
              Get Started
            </Link>

            <Link
              href="/student"
              style={{
                padding: "10px 16px",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
            >
              Demo Student
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section
        style={{
          padding: "40px",
          background: "#fafafa",
          borderTop: "1px solid #eee",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
          Core Features
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          <div style={cardStyle}>
            <h3>Student Management</h3>
            <p>Add, update, and manage student records easily.</p>
          </div>

          <div style={cardStyle}>
            <h3>Teacher Dashboard</h3>
            <p>Manage classes, attendance, and grading.</p>
          </div>

          <div style={cardStyle}>
            <h3>Admin Control</h3>
            <p>Full system control over users and data.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: "20px",
          textAlign: "center",
          borderTop: "1px solid #eee",
          color: "#777",
        }}
      >
        Built with Next.js for learning purposes
      </footer>
    </main>
  );
}

const cardStyle: React.CSSProperties = {
  padding: "16px",
  border: "1px solid #e5e5e5",
  borderRadius: "8px",
  background: "white",
};