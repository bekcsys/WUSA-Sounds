import time

# Initialize NeoPixel with error handling
pixels = None
NEOPIXEL_AVAILABLE = False

try:
    import board
    import neopixel
    
    # Choose an open pin connected to the Data In of the NeoPixel strip, i.e. board.D18
    # NeoPixels must be connected to D10, D12, D18 or D21 to work.
    pixel_pin = board.D12
    
    # The number of NeoPixels
    num_pixels = 30
    
    # The order of the pixel colors - RGB or GRB. Some NeoPixels have red and green reversed!
    # For RGBW NeoPixels, simply change the ORDER to RGBW or GRBW.
    ORDER = neopixel.RGBW
    
    pixels = neopixel.NeoPixel(pixel_pin, num_pixels, brightness=0.2, auto_write=False, pixel_order=ORDER)
    NEOPIXEL_AVAILABLE = True
    print("NeoPixel initialized successfully")
except ImportError as e:
    print(f"NeoPixel library not available: {e}")
    NEOPIXEL_AVAILABLE = False
except Exception as e:
    print(f"Error initializing NeoPixel: {e}")
    NEOPIXEL_AVAILABLE = False

def wheel(pos):
    # Input a value 0 to 255 to get a color value.
    # The colours are a transition r - g - b - back to r.
    if pos < 0 or pos > 255:
        r = g = b = 0
    elif pos < 85:
        r = int(pos * 3)
        g = int(255 - pos * 3)
        b = 0
    elif pos < 170:
        pos -= 85
        r = int(255 - pos * 3)
        g = 0
        b = int(pos * 3)
    else:
        pos -= 170
        r = 0
        g = int(pos * 3)
        b = int(255 - pos * 3)
    
    # Return appropriate tuple based on ORDER if available
    if NEOPIXEL_AVAILABLE:
        try:
            import neopixel
            return (r, g, b) if ORDER in {neopixel.RGB, neopixel.GRB} else (r, g, b, 0)
        except:
            return (r, g, b, 0)
    return (r, g, b, 0)


def rainbow_cycle(wait):
    if not NEOPIXEL_AVAILABLE or pixels is None:
        print("NeoPixel not available, cannot run rainbow cycle")
        return
    
    try:
        for j in range(255):
            for i in range(num_pixels):
                pixel_index = (i * 256 // num_pixels) + j
                pixels[i] = wheel(pixel_index & 255)
            pixels.show()
            time.sleep(wait)
    except Exception as e:
        print(f"Error in rainbow_cycle: {e}")


if __name__ == '__main__':
    if not NEOPIXEL_AVAILABLE:
        print("NeoPixel hardware not available. Exiting.")
        exit(1)
    
    try:
        while True:
            # Comment this line out if you have RGBW/GRBW NeoPixels
            # pixels.fill((50, 255, 50))
            # Uncomment this line if you have RGBW/GRBW NeoPixels
            #pixels.fill((255, 255, 255, 255))
            #pixels.show()
            #time.sleep(10)

            # Comment this line out if you have RGBW/GRBW NeoPixels
            # pixels.fill((0, 255, 0))
            # Uncomment this line if you have RGBW/GRBW NeoPixels
            #pixels.fill((0, 255, 0, 50))
            #pixels.show()
            #time.sleep(10)

            rainbow_cycle(0.01)  # rainbow cycle with 1ms delay per step
    except KeyboardInterrupt:
        print("\nInterrupted by user")
        # Cleanup: turn off all pixels
        try:
            if pixels is not None:
                pixels.fill((0, 0, 0, 0))
                pixels.show()
        except Exception as e:
            print(f"Error during cleanup: {e}")
    except Exception as e:
        print(f"Unexpected error: {e}")
        # Cleanup on error
        try:
            if pixels is not None:
                pixels.fill((0, 0, 0, 0))
                pixels.show()
        except:
            pass
