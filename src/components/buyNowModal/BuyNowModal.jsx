import {
    Button,
    Dialog,
    DialogBody,
} from "@material-tailwind/react";
import { useState } from "react";

const BuyNowModal = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);
    return (
        <>
            <Button
                type="button"
                onClick={handleOpen}
                className="w-full px-4 py-3 text-center text-gray-100 bg-pink-600 border border-transparent dark:border-gray-700 hover:border-pink-500 hover:text-pink-700 hover:bg-pink-100 rounded-xl"
            >
                Buy now
            </Button>
            <Dialog open={open} handler={handleOpen} className=" bg-pink-50">
                <DialogBody className="">
                    <div className="mb-3">
                        <input
                            type="text"
                            name="name"
                            placeholder='Enter your name'
                            className='w-full px-2 py-2 text-pink-600 placeholder-pink-300 border border-pink-200 rounded-md outline-none bg-pink-50'
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="address"
                            placeholder='Enter your address'
                            className='w-full px-2 py-2 text-pink-600 placeholder-pink-300 border border-pink-200 rounded-md outline-none bg-pink-50'
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="number"
                            name="pincode"
                            placeholder='Enter your pincode'
                            className='w-full px-2 py-2 text-pink-600 placeholder-pink-300 border border-pink-200 rounded-md outline-none bg-pink-50'
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            name="mobileNumber"
                            placeholder='Enter your mobileNumber'
                            className='w-full px-2 py-2 text-pink-600 placeholder-pink-300 border border-pink-200 rounded-md outline-none bg-pink-50'
                        />
                    </div>

                    <div className="">
                    <Button
                type="button"
                onClick={handleOpen}
                className="w-full px-4 py-3 text-center text-gray-100 bg-pink-600 border border-transparent rounded-lg dark:border-gray-700"
            >
                Buy now
            </Button>
                    </div>

                </DialogBody>
            </Dialog>
        </>
    );
}

export default BuyNowModal;