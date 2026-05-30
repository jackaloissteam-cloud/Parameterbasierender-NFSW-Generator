export async function POST(request) {
  try {
    const { action, id } = await request.json();

    // Log the action (in a real app, you might trigger a child process or scheduled task)
    console.log(`[NASBOX COMMANDER] Triggering action: ${action} (ID: ${id})`);

    // Simulate different responses based on action
    if (action === "Systemcheck") {
      return Response.json({
        success: true,
        message: "Systemcheck abgeschlossen.",
        details: {
          nas: "Online (Y:\\)",
          scripts: "Gefunden (C:\\Scripts)",
          tasks: "5/5 Aktiv",
          ai: "Bereit",
        },
      });
    }

    return Response.json({
      success: true,
      message: `${action} wurde erfolgreich über die Aufgabenplanung gestartet.`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Commander API Error:", error);
    return Response.json(
      {
        success: false,
        message: "Fehler beim Starten der Aktion.",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  // Simulate status check
  return Response.json({
    nas: "ONLINE",
    logs: "OK",
    ai: "BEREIT",
    lastBackup: "Heute, 14:20 Uhr",
  });
}
