import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Product } from '../models/product';
import { AuthorizationGuardGraphQL } from 'src/http/auth/authorization_graphql.guard';
import { ProductsService } from 'src/services/products.service';
import { CreateProductInput } from '../inputs/create-product-input';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private productService: ProductsService) {}

  @Query(() => [Product])
  products() {
    return this.productService.listAllProducts();
  }

  @UseGuards(AuthorizationGuardGraphQL)
  @Mutation(() => Product)
  createProduct(@Args('data') data: CreateProductInput) {
    return this.productService.createProduct(data);
  }
}
