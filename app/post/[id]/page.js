import Post from '@/components/Post';

export async function generateMetadata({ params }) {
  const id = params.id;
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/post/${id}`;
  
  console.log("Fetching from URL:", apiUrl); // Add this line for debugging

  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error(`Failed to fetch post data: ${response.statusText}`);
  }

  const post = await response.json();

  return {
    title: post.title,
  };
}

export default function Page({ params }) {
  return <Post params={params} />;
}
