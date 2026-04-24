package com.npl.na_ponta_do_lapis.web.controller;

import com.npl.na_ponta_do_lapis.entity.Usuario;
import com.npl.na_ponta_do_lapis.service.ConviteService;
import com.npl.na_ponta_do_lapis.web.dto.ConviteResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/convite")
@Tag(name = "Convite", description = "Gerenciamento de Convites para Famílias")
public class ConviteController {

    private ConviteService conviteService;
    public ConviteController(ConviteService conviteService) { this.conviteService = conviteService; }

    @Operation(summary = "Listar convites pendentes para o usuário autenticado")
    @GetMapping("/pendentes")
    public ResponseEntity<List<ConviteResponseDTO>> listarPendentes(Usuario usuario) {
        return ResponseEntity.ok(conviteService.listarPendentes(usuario));
    }

    @Operation(summary = "Enviar convite para usuário")
    @PostMapping("/convidar")
    public ResponseEntity<ConviteResponseDTO> enviarConvite(Usuario solicitante, Usuario destinatario) {
        return ResponseEntity.ok(conviteService.enviarConvite(destinatario.getUsername() , solicitante));
    }

    @Operation(summary = "Aceitar convite para familia")
    @PostMapping("/aceitar")
    public ResponseEntity<ConviteResponseDTO> aceitarConvite(Long conviteId, Usuario usuario) {
        return ResponseEntity.ok(conviteService.aceitarConvite(conviteId, usuario));
    }

    @Operation(summary = "Recusar convite para familia")
    @PostMapping("/recusar")
    public ResponseEntity<ConviteResponseDTO> recusarConvite(Long conviteId, Usuario usuario) {
        return ResponseEntity.ok(conviteService.recusarConvite(conviteId, usuario));
    }
}
