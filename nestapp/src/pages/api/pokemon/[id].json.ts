
import { Controller, Delete, Param, Res } from "@nestjs/common";
import { Response } from "express";
import { PokemonService } from "../../../services/pokemos.service"; 
@Controller("pokemon")
export class PokemonController1 {
  constructor(private readonly pokemonService: PokemonService) {}

  @Delete(":id")
  async deletePokemon(@Param("id") id: string, @Res() res: Response) {
    try {
      const pokemonId = parseInt(id, 10);
      const deletedPokemon = this.pokemonService.deletePokemon(pokemonId);
      return res.status(200).json(deletedPokemon);
    } catch (error) {
      return res.status(500).json({ message: "Error al eliminar Pokemon" });
    }
  }
}

