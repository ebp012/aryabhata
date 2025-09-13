#!/usr/bin/env ruby
require 'net/http'
require 'uri'
require 'json'

def fetch_wiki_page
  uri = URI.parse('https://en.wikipedia.org/wiki/List_of_chemical_elements')
  response = Net::HTTP.get_response(uri)
  response.body
end

def parse_elements(html)

  elements = {}
  antielements = {}
  
  # Other elements
  elements[0] = [0, 'neutronium', 'neutron', 'Nu', [1, 0], 0, 'exotic', 0, 0, 0, 0]
  antielements[0] = [-0, 'muonium', 'muon', 'Mu', [1, -0], 0, 'exotic', 0, 0, 0, 0]
  elements[312] = [312, 'obamium', 'obam', 'Ob', [1, 0], 0, 'meme/undiscovered', 0, 0, 0, 0]
  antielements[312] = [-312, 'antiobamium', 'antiobam', '-Ob', [1, 0], 0, 'meme antielement/antiundiscovered', 0, 0, 0, 0]
  # Generate systematic names for elements 119-173
  (119..173).each do |i|
    suffix = case i
      when 119..136 then 'undiscovered'
      when 137 then 'feynmanium'
      when 138..143 then 'superactinide'
      when 144..157 then 'unquadquadide'
      when 158..166 then 'transition metal'
      when 167..169 then 'post-transition metal'
      when 170 then 'metalloid'
      when 171 then 'halogen'
      when 172 then 'noble gas'
      when 173 then 'alkali metal'
    end

    j = i - 100
    # First part is always 'Un'
    name_parts = ['Un']
    
    # Second part (tens digit)
    tens = (j / 10) % 10
    second = case tens
      when 0 then 'nil'
      when 1 then 'un'
      when 2 then 'bi'
      when 3 then 'tri'
      when 4 then 'quad'
      when 5 then 'pent'
      when 6 then 'hex'
      when 7 then 'sept'
      when 8 then 'oct'
      else 'enn'
    end
    name_parts << second

    # Third part (ones digit)
    ones = j % 10
    third = case ones
      when 0 then 'nil'
      when 1 then 'un'
      when 2 then 'bi'
      when 3 then 'tri'
      when 4 then 'quad'
      when 5 then 'pent'
      when 6 then 'hex'
      when 7 then 'sept'
      when 8 then 'oct'
      when 9 then 'enn'
      else 'broken'
    end
    name_parts << third

    # Special case for element 137
    if i == 137
      name = 'feynmanium'
      symbol = 'Fy'
      root = 'feynman'
    else
      # Generate the full name and symbol
      name = name_parts.join.downcase + 'ium'
      # Get abbreviated symbol form like in JS: ['Un', 'U'], ['nil', 'n'] etc
      symbol_parts = ['U']  # First part is always U
      symbol_parts << case tens  # Second part
        when 0 then 'n'
        when 1 then 'u'
        when 2 then 'b'
        when 3 then 't'
        when 4 then 'q'
        when 5 then 'p'
        when 6 then 'h'
        when 7 then 's'
        when 8 then 'o'
        else 'n'
      end
      symbol_parts << case ones  # Third part
        when 0 then 'n'
        when 1 then 'u'
        when 2 then 'b'
        when 3 then 't'
        when 4 then 'q'
        when 5 then 'p'
        when 6 then 'h'
        when 7 then 's'
        when 8 then 'o'
        when 9 then 'n'
        else 'x'
      end
      symbol = symbol_parts.join
      root = name_parts.join.downcase
    end

    elements[i] = [
      i,              # atomic number
      name,           # full name
      root,           # root name
      symbol,         # symbol
      [1, i],        # coordinates
      0,             # mass (unknown)
      suffix,        # type
      0,           # melting point
      0            # boiling point
    ]
    
    # Generate corresponding antielement
    antielements[i] = [
      -i,                    # atomic number (negative)
      'anti' + name,         # full name
      'anti' + root,         # root name
      '-' + symbol,          # symbol
      [1, i],               # coordinates (same as regular element)
      0,                    # mass (unknown)
      'anti' + suffix,      # type
      0,                  # melting point
      0                   # boiling point
    ]
  end
    #elements[Float::INFINITY] = [Float::INFINITY, 'infinitium', 'infinitite', 'If', [-1, 0], Float::INFINITY, 'fictional material', Float::INFINITY, Float::INFINITY]
    #antielements[Float::INFINITY] = [-Float::INFINITY, 'antinfinitium', 'antinfinitite', '-If', [-1, 0], -Float::INFINITY, 'fictional antimaterial', Float::INFINITY, -Float::INFINITY]
  
  # Extract the main table data using regex
  table_data = html.scan(/<tr[^>]*>.*?<\/tr>/m)
  
  table_data.each do |row|
    # Skip header rows and rows without proper data
    next unless row.include?('</td>')
    
    # Extract atomic number
    atomic_number = row.match(/>\s*(\d+)\s*<\/td>/m)&.[](1)
    next unless atomic_number
    
    atomic_number = atomic_number.to_i
    
    # Extract name
    name = row.match(/title="([^"]+)(?:\s+\(element\)|\s*)"[^>]*>[^<]+<\/a>/i)&.[](1)&.downcase.chomp(' (element)')
    next unless name
    
    # Extract symbol
    symbol = row.match(/>\s*([A-Z][a-z]?)\s*<\/td>/m)&.[](1)
    next unless symbol
    
    # Extract block (for coordinates, in period, group)
    block = row.match(/>\s*(s|p|d|f)-block\s*</i)&.[](1)
    coordinates = block ? [block == 'f' ? 3 : block == 'd' ? 2 : block == 'p' ? 1 : 0, atomic_number] : [-1, 0]
    
    # Extract mass
    mass = row.match(/>\s*([\d.]+)\s*<\/td>/m)&.[](8)
    mass = mass ? mass.to_f : 0
    
    # Extract category/type
    # type = row.match(/background-color:[^>]+>([^<]+)</i)&.[](1)&.downcase&.strip
    type = row.match(/>\s*([\d.]+)\s*<\/td>/m)&.[](7)
    type = 'unknown' unless type
    
    # Extract melting point
    melt = row.match(/>\s*([\d.]+)\s*<\/td>/m)&.[](10)
    melt = melt ? melt.to_f : 0
    
    # Extract boiling boint
    boil = row.match(/>\s*([\d.]+)\s*<\/td>/m)&.[](11)
    boil = boil ? boil.to_f : 0
    
    # Generate root (name minus last three letters, as requested)
    namePlus = name + '9'
    root = namePlus.chomp('ium9').chomp('um9').chomp('on9').chomp('ine9').chomp('ogen9').chomp('ygen9').chomp('ur9').chomp('uth9').chomp('ous9').chomp('9')
    if name == 'sodium'
        root = 'natr'
    end
    if name == 'potassium'
        root = 'kal'
    end
    if name == 'sulfur'
        name = 'sulphur'
        root = 'sulph'
    end
    if name == 'iron'
        root = 'ferr'
    end
    if name == 'copper'
        root = 'cupr'
    end
    if name == 'silver'
        root = 'argent'
    end
    if name == 'tin'
        root = 'stann'
    end
    if name == 'antimony'
        root = 'stib'
    end
    if name == 'tungsten'
        root = 'wolfram'
    end
    if name == 'gold'
        root = 'aur'
    end
    if name == 'mercury'
        root = 'hydrargyr'
    end
    if name == 'lead'
        root = 'plumb'
    end
    
    # Create element array
    elements[atomic_number] = [
      atomic_number,        # atomic number
      name,                # full name
      root,                # root name
      symbol,              # symbol
      coordinates,         # coordinates based on block
      mass,               # atomic mass
      type,               # element type/category
      melt,                # melting point
      boil                 # boiling point
    ]
    
    # Antielemental version
    antielements[atomic_number] = [
      -atomic_number,        # atomic number
      'anti' + name,                # full name
      'anti' + root,                # root name
      '-' + symbol,              # symbol
      coordinates,         # coordinates based on block
      mass,               # atomic mass (unchanged for antimatter)
      'anti' + type,               # element type/category
      melt,                # melting point
      boil                 # boiling point
    ]
  end
  
  [elements, antielements]
end

def generate_js(elements)
  js_output = "const periodicTable = {\n"
  
  elements.sort.each do |number, data|
    js_output += "  #{number}: #{data.to_json},\n"
  end
  
  js_output += "};\n\n"
  
  # Add Infinity element after the JSON declaration
  js_output += "periodicTable[9999] = [Infinity, 'infinitium', 'infinit', 'If', [-1, 0], Infinity, 'fictional material', Infinity, Infinity];\n"
  js_output
end

def antigenerate_js(antielements)
  js_output = "const antimatterTable = {\n"
  
  antielements.sort.each do |number, data|
    js_output += "  #{number}: #{data.to_json},\n"
  end
  
  js_output += "};\n\n"
  
  # Add negative Infinity element after the JSON declaration
  js_output += "antimatterTable[9999] = [-Infinity, 'antinfinitium', 'antinfinit', '-If', [-1, 0], Infinity, 'fictional antimaterial', Infinity, -Infinity];\n"
  js_output
end

# Main execution
begin
    js_code = "// /scripts/ruby/update-elements.rb run at: " + Time.now.to_s + "\n"
  js_code += "// Fetching data from Wikipedia...\n"
  wiki_content = fetch_wiki_page
  
  js_code += "// Parsing elements...\n"
  elements, antielements = parse_elements(wiki_content)
  
  js_code += "// Generating JavaScript...\n\n// Elements\n"
  js_code += generate_js(elements).gsub(/"ii([^"]*)"/, '"i\1"')  # Remove double I's in element symbols
  js_code += "\n\n\n\n// Antielements\n"
  js_code += antigenerate_js(antielements).gsub(/"ii([^"]*)"/, '"i\1"')  # Remove double I's in antielement symbols
  
  # puts "\nOutput JavaScript (copy this to periodictable.js):\n\n"
  puts js_code
  
rescue StandardError => e
  puts "// Error: #{e.message}"
  # puts "// " + e.backtrace
end
