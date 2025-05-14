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
async function getFonts() {
  try {
    const response = await fetch("http://localhost:3001/buyerCartFonts");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}
async function getMusic() {
  try {
    const response = await fetch("http://localhost:3001/buyerCartMusic");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

async function getDownloadVideos(ids: number[]) {
  try {
    // 构建URL查询参数，每个id作为一个vids参数
    const queryParams = new URLSearchParams();
    ids.forEach(id => {
      queryParams.append('vids', id.toString());
    });

    const response = await fetch(`http://localhost:3001/downloadVideos?${queryParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

async function getDownloadFonts(ids: number[]) {
  try {
    // 构建URL查询参数，每个id作为一个vids参数
    const queryParams = new URLSearchParams();
    ids.forEach(id => {
      queryParams.append('fids', id.toString());
    });

    const response = await fetch(`http://localhost:3001/downloadFonts?${queryParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

async function getDownloadMusic(ids: number[]) {
  try {
    // 构建URL查询参数，每个id作为一个vids参数
    const queryParams = new URLSearchParams();
    ids.forEach(id => {
      queryParams.append('mids', id.toString());
    });

    const response = await fetch(`http://localhost:3001/downloadMusic?${queryParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });

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
  const [videos, fonts, music] = await Promise.all([
    getVideos(),
    getFonts(),
    getMusic()
  ]);

  const [downloadVideos, downloadFonts, downloadMusic] = await Promise.all([
    getDownloadVideos(videos.map((video: ItemInterface) => video.vid)),
    getDownloadFonts(fonts.map((font: ItemInterface) => font.fid)),
    getDownloadMusic(music.map((music: ItemInterface) => music.mid))
  ]);
  
  return (
    <div>
      <ClientComponent videos={videos} fonts={fonts} music={music} downloadVideos={downloadVideos} downloadFonts={downloadFonts} downloadMusic={downloadMusic} />
    </div>
  );
}
export default Cart;
