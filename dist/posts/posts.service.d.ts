import { EmailService } from 'src/email/email.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostsService {
    private emailService;
    constructor(emailService: EmailService);
    create(createPostDto: CreatePostDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePostDto: UpdatePostDto): string;
    remove(id: number): string;
}
