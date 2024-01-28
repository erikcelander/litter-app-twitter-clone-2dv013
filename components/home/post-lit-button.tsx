import { useToast } from "@/components/ui/use-toast"
import { Button } from "../ui/button"

export const PostLitButton = () => {
    const { toast } = useToast()

    return (
        <Button onClick={() => {
            toast({
                title: "Success  🎉",
                description: "Your lit has been posted!",
                
            })
        }} type='submit' className='bg-[#F6AE28] rounded-3xl w-20 text-md text-black'>
            Post
        </Button>
    )
}
