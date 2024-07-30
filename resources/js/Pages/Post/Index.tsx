import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Meta, PageProps, Post } from '@/types';
import { useInView } from "react-intersection-observer"
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Index({ auth, posts }: PageProps & { posts: { data: Post[], meta: Meta } }) {
    const { ref, inView } = useInView({})
    const [postsData, setPostsData] = useState(posts.data)
    const [path, setPath] = useState(posts.meta.path)
    const [nextCursor, setNextCursor] = useState(posts.meta.next_cursor)

    useEffect(() => {
        if (inView && nextCursor !== null) {
            axios.get(path, {
                params: {
                    cursor: nextCursor
                }
            }).then((response) => {
                setPostsData(postsData.concat(response.data.data))
                setPath(response.data.meta.path)
                setNextCursor(response.data.meta.next_cursor)
            }).catch((error) => {
                console.log(error)
            })

        }
    }, [inView])

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Post</h2>}
        >
            <Head title="Posts" />

            <div className="max-w-2xl mx-auto my-12 space-y-12">
                {postsData.map((post) => (
                    <div key={post.id}>
                        <h1 className="text-3xl font-bold">{`${post.id}: ${post.title}`}</h1>
                        <p className="mt-2 text-lg">{post.teaser}</p>
                    </div>
                ))}
                <div className='-translate-y-32' ref={ref}></div>
            </div>
        </AuthenticatedLayout>
    );
}
