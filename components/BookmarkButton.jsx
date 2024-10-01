'use client';

import { useState, useEffect } from 'react';
import bookmarkProperty from "@/app/actions/bookmarkProperty";
import checkBookmarkStatus from '@/app/actions/checkBookmarkStatus';
import { toast } from "react-toastify";
import { FaBookmark } from "react-icons/fa";
import { useSession } from "next-auth/react";

const BookmarkButton = ({ property }) => {
    // Get the session user.
    const { data: session } = useSession();
    const userId = session?.user?.id;

    // States
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [loading, setLoading] = useState(true);

    // This is done to ensure reloading the page doesn't remove the button status.
    useEffect(() => {
        if (!userId) {
            setLoading(false);
            return;
        }
        checkBookmarkStatus(property._id).then((res) => {
            if (res.error) toast.error(res.error);
            if (res.isBookmarked) setIsBookmarked(res.isBookmarked);
            setLoading(false);
        });
     }, [property._id, userId, checkBookmarkStatus]);

    const handleBookmarkClick = async () => {
        if (!userId) {
            toast.error('You need to be signed in to bookmark a property');
            return;
        }

        bookmarkProperty(property._id).then((res) => {
            if (res.error) return toast.error('res.error');
            setIsBookmarked(res.isBookmarked);// Change the state.
            toast.success(res.message);
        });
    };

    // Check if it is loading.
    if (loading) {
        return <p className="text-center">Loading...</p>
    }
    
    // Show the bookmark buttons based on the state.
    return isBookmarked ? ( 
        <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
            onClick={handleBookmarkClick}
        >
            <FaBookmark className="mr-2" /> Remove Bookmark
        </button>
    ) : (
         <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
            onClick={handleBookmarkClick}
        >
            <FaBookmark className="mr-2" /> Bookmark Property
        </button>   
     );
}
 
export default BookmarkButton;