import { Controller, Get, Post, Query, Body, Res, HttpStatus, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { PokemonService, Pokemon } from "../../../services/pokemos.service";
import { AuthMiddleware } from '../../api/kkpt/x';

@Controller("pokemon")
export class PokemonController3 {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  //@UseGuards(AuthMiddleware)
  async getPokemonList(@Query("page") page: number = 1, @Res() res: Response) {
    try {
      const pokemonList = this.pokemonService.getPokemonList(page);
      return res.status(HttpStatus.OK).json(pokemonList);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Error fetching Pokemon" });
    }
  }

  @Post()
  async addPokemon(@Body() pokemon: Pokemon, @Res() res: Response) {
    try {
      const addedPokemon = this.pokemonService.addPokemon(pokemon);
      return res.status(HttpStatus.CREATED).json(addedPokemon);
    } catch (error) {
      return res.status(500).json({ message: "Error al agregar Pokemon" });
    }
  }
}
