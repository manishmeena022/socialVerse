import Image from "next/image";

export default function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        // create layout here for login and register pages
        // i want a container on the center of the page
        // and container will be divided into two halfs
        // left half will be for image and right half will be for form

        <div className="flex h-screen bg-gray-200">
            <div className="w-1/2 bg-blue-500">
                <Image src="/login.svg" alt="login" width={500} height={500} />
            </div>
            <div className="m-auto w-96 bg-white shadow-md rounded-md p-4">
                {children}
            </div>
        </div>
    );
}
