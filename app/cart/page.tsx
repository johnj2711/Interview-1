import ClientComponent from "@/components/ClientComponent";

async function getVideos() {
  try {
    const response = await fetch("http://localhost:3001/buyerCartVideos");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

async function Cart() {
  const videos = await getVideos();
  return (
    <div className="min-h-screen p-4">
      <ClientComponent videos={videos} />
    </div>
  );
}
export default Cart;
