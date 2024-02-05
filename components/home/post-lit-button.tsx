import { useToast } from "@/components/ui/use-toast"
import { Button } from "../ui/button"

export const PostLitButton = () => {
    const { toast } = useToast()

    return (
        <Button onClick={() => {
       
        }} type='submit' className='bg-[#F6AE28] w-20 rounded-3xl text-black'>
            Post
        </Button>
    )
}
