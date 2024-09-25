const express = require('express');
const Playlist = require('../models/playlist');
const router = express.Router();

// GET: List all playlists
router.get('/', async (req, res) => {
    const playlists = await Playlist.find();
    res.render('index', { playlists });
});

// POST: Create new playlist
router.post('/', async (req, res) => {
    const { name, description } = req.body;
    await Playlist.create({ name, description });
    res.redirect('/playlists');
});

// POST: Add song to playlist
router.post('/:id/addSong', async (req, res) => {
    const playlist = await Playlist.findById(req.params.id);
    const { title, artist } = req.body;
    playlist.songs.push({ title, artist });
    await playlist.save();
    res.redirect('/playlists');
});

// DELETE: Delete playlist
router.post('/:id/delete', async (req, res) => {
    await Playlist.findByIdAndDelete(req.params.id);
    res.redirect('/playlists');
});

// DELETE: Remove song from playlist
router.post('/:playlistId/removeSong/:songId', async (req, res) => {
    const playlist = await Playlist.findById(req.params.playlistId);
    playlist.songs = playlist.songs.filter(song => song._id != req.params.songId);
    await playlist.save();
    res.redirect('/playlists');
});

module.exports = router;
