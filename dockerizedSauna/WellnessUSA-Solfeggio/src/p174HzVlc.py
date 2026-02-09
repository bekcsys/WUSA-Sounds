import vlc
import time
import sys
                
def play_mp3(file_path):
    instance = vlc.Instance()
    player = instance.media_player_new()
    media = instance.media_new(file_path)
    player.set_media(media)
                
    player.play()
    # Keep the script running while the audio plays
    while player.is_playing():
        time.sleep(1)
                    
        player.stop()

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python play_mp3.py python3 /home/admin/Python/pPower.py")
        sys.exit(1)
                
    mp3_file = sys.argv[1]
    play_mp3(mp3_file)
