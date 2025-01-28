import {ParseStatus, z} from'zod'


//  for backend
export const signupInput = z.object({                               //Signup
    email : z.string().email(),
    password : z.string().min(6),
    name: z.string().optional()
})

                                                                    //Signin
export const signinInput = z.object({
    email : z.string().email(),
    password : z.string().min(6)
})


                                                                 //create blog
export const createBlogInput = z.object({
    title : z.string(),
    content : z.string()
})

                                                                //update blog
export const updateBlogInput = z.object({
    title : z.string(),
    content : z.string(),
    id : z.string()
})

//type of inferenc of zod      = for frontend
export type SignupInput = z.infer<typeof signupInput>
export type SigninInput = z.infer<typeof signinInput>
export type CreateBlogInput = z.infer<typeof createBlogInput>
export type UpdateBlogInput = z.infer<typeof updateBlogInput>
