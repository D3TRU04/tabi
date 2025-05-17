import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { billAmount, numberOfPeople, context } = await request.json();

    // Validate input
    if (!billAmount || !numberOfPeople) {
      return NextResponse.json(
        { error: "Bill amount and number of people are required" },
        { status: 400 }
      );
    }

    // Calculate basic split
    const splitAmount = billAmount / numberOfPeople;

    // Generate advice based on context
    let advice = "";
    if (context === "restaurant") {
      advice = "Consider adding 15-20% for tip before splitting the bill.";
    } else if (context === "rent") {
      advice = "For rent splitting, consider factors like room size and amenities.";
    } else if (context === "utilities") {
      advice = "For utilities, consider usage patterns and occupancy time.";
    }

    return NextResponse.json({
      splitAmount: parseFloat(splitAmount.toFixed(2)),
      advice,
      context
    });
  } catch (error) {
    console.error("Error processing AI advice request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
} 