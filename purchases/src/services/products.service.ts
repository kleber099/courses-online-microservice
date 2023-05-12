import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import slugify from 'slugify';

interface CreateProductParams {
  title: string;
}

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  listAllProducts() {
    return this.prisma.product.findMany();
  }

  getProductById(id: string) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async createProduct({ title }: CreateProductParams) {
    const slug = slugify(title).toLowerCase();

    const productWithSamelug = await this.prisma.product.findUnique({
      where: {
        slug,
      },
    });

    if (productWithSamelug) {
      throw new Error('Another product with slug already exists.');
    }

    return this.prisma.product.create({
      data: {
        title,
        slug,
      },
    });
  }
}